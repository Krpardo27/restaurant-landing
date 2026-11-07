# Generación e impresión de QR por mesa

## Uso

1. Arranca el desarrollo con `npm run dev` y abre `/admin/mesas` en el puerto que muestre Vite (la tarea existente utiliza http://localhost:5174/admin/mesas).
2. Comprueba **Dirección del sitio publicado**. Debe ser el dominio HTTPS real de la carta, sin `/menu`, parámetros ni fragmentos.
3. Pulsa **Aplicar dirección**. Cambiar el campo no actualiza silenciosamente el lote: hasta aplicar una dirección válida, los QR y la impresión permanecen deshabilitados.
4. Elige entre 1 y 100 mesas y pulsa **Actualizar mesas**. La numeración es consecutiva y comienza en 1. No es un gestor de ocupación, reservas ni pedidos.
5. Abre **Comprobar enlace** y escanea un QR con un teléfono antes de imprimir el lote.
6. Usa **Imprimir mesa N** para una tarjeta o **Imprimir todas** para el lote. Se puede elegir «Guardar como PDF» en el diálogo del navegador.

La cantidad se restablece a 12 al recargar o abandonar el panel. Los cambios no se guardan en una base de datos ni modifican `.env`.

## Dominio persistente

El valor inicial procede de `VITE_SITE_URL`. Para evitar introducirlo cada vez, establece esa variable en tu `.env` existente con el origen HTTPS real de producción y reinicia Vite después de editarla. Esta variable es pública y no debe contener contraseñas ni tokens.

No se utiliza `window.location.origin` como fallback. El generador rechaza HTTP, protocolos ejecutables, credenciales en la URL, localhost, IPs, dominios internos/reservados y dominios de ejemplo. Tampoco acepta rutas, query ni fragmentos en el campo del dominio.

La validación comprueba el formato y los destinos reservados; no comprueba el registro DNS, que el sitio esté desplegado o que pertenezca al usuario. Es necesario comprobar el enlace y el escaneo antes de imprimir.

## Impresión

- La selección se establece con atributos DOM de impresión antes de llamar a `window.print()`, sin forzar renders de React.
- El CSS de impresión oculta formularios, botones, cabecera y avisos de pantalla; en modo individual oculta todas las tarjetas salvo la elegida.
- El evento `afterprint` limpia la selección también al cerrar o cancelar el diálogo. Ctrl+P vuelve a incluir todas las mesas cuando el dominio está aplicado.
- Si no hay un dominio válido aplicado, Ctrl+P no imprime códigos: muestra una advertencia.
- Página A4 nombrada `qr-tables`, margen de 12 mm, dos columnas para el lote y tarjeta individual centrada. Las tarjetas evitan cortes internos.
- SVG negro sobre blanco, zona de silencio de 4 módulos, corrección M y aproximadamente 50 mm de ancho al imprimir. En pantalla se adapta sin desbordar.
- El estilo de impresión queda limitado al panel para no alterar la impresión de las otras vistas si se navega después.

En el diálogo del navegador conviene desactivar encabezados y pies, mantener escala 100 % y revisar la vista previa. No se puede confirmar desde JavaScript que se haya impreso físicamente: los mensajes solo indican que se abre el diálogo.

## Acceso y producción

Este proyecto es una aplicación estática sin backend de autenticación. `/admin/mesas` se registra **solo en desarrollo**, con carga diferida y estado de carga. En `npm run build`, la rama administrativa se elimina: no se publica la ruta, el módulo ni el CSS de la herramienta. En la vista previa de producción la ruta muestra «Página no encontrada».

Esto no es un sistema de login ni una autorización del lado servidor. Para administrar QR online se necesita una solución de autenticación/autorización real o protección del proveedor de alojamiento. No expongas el servidor de desarrollo a Internet.

Los QR generados localmente sí apuntan al dominio público configurado y pueden utilizarse en las mesas; no requieren publicar la herramienta.

## Archivos

- `src/views/MesasQR.jsx`: configuración, tarjetas, estado de impresión y mensajes accesibles.
- `src/components/QRGenerator.jsx`: SVG validado con destino explícito.
- `src/utils/qr.js`: validaciones puras de dominio/mesas y construcción del enlace.
- `src/styles/mesas-qr.css`: pantalla y estilos de impresión aislados.
- `src/router.jsx`: ruta de herramienta solo en desarrollo, sin una contraseña ficticia en cliente.
- `tests/qr.test.js`: siete pruebas nativas de Node, ejecutables con `npm test`, sin dependencias nuevas.

No se modificaron `.env` ni los cambios de `landing.css`.

## Verificaciones realizadas

- `npm test`: 7 pruebas correctas, incluyendo numerosos destinos inválidos, límites y URL final con mesa.
- Lint, build y diagnóstico React sobre cambios sin errores ni advertencias nuevas.
- Panel a 320, 390, 768, 1024 y 1440 px: sin desbordamiento; SVG de 200 px en pantalla.
- Destino de mesa 7: origen HTTPS aplicado + `/menu?mesa=7`.
- Rechazo de localhost: cero SVG e impresión deshabilitada.
- Impresión simulada: mesa 7 muestra solo esa tarjeta y oculta controles; lote muestra 12 tarjetas. Limpieza de selección tras `afterprint`.
- Cambio a 4 mesas: cuatro tarjetas y contador del botón de lote actualizado.
- Edición de dominio pendiente: cero códigos, botón de impresión deshabilitado y aviso en medios de impresión.
- Vista previa de producción en puerto 4173: `/admin/mesas` muestra la página no encontrada.

Las pruebas de impresión usaron el medio print del navegador y sustituyeron `window.print` temporalmente para no abrir una impresora real. No se validó una impresora física, la paginación de cada modelo ni el escaneo con una cámara real; deben comprobarse con una primera tarjeta.
