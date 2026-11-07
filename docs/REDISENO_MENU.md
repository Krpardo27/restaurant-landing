# Rediseño del menú QR

## Cambios aplicados

- `src/views/MenuQR.jsx`: nueva cabecera de marca y carta, texto que representa todas las categorías (no solo pizzas), ilustración local independiente de Cloudinary, número de mesa integrado y resumen real de opciones.
- Tabs sticky con contadores, controles horizontales, scroll limitado al carril y centrado de la categoría activa. Roles tablist/tab/tabpanel, selección única y navegación con flechas, Home y End. Los filtros de URL conservan `mesa` y el resto del contexto.
- Búsqueda dentro de la categoría por nombre, descripción e ingredientes, sin distinguir mayúsculas o acentos. Filtros Todos/Veganos/Picantes, contador de resultados y estado vacío con acción para limpiar filtros.
- `src/sections/MenuSection.jsx`: tarjetas en una columna móvil y dos en escritorio, precios separados de títulos largos, etiquetas dietarias legibles, imágenes de reserva y enlaces reales para pedir por WhatsApp. Se simplificó la selección de datos y se retiraron animaciones que no aportaban al listado.
- `src/components/PizzaDetailModal.jsx`: estilo coherente con la carta, título editorial, contexto de mesa, cierre táctil de 44 px y acciones flexibles. Conserva foco, Escape y bloqueo del fondo.
- `src/layout/QRLayout.jsx`: retirado el límite de 768 px; la propia carta gestiona su ancho máximo de 1200 px y sus márgenes adaptables.
- `src/styles/menu.css`: estilos encapsulados de la carta, paleta cálida oscura, tipografía editorial, estados de foco y movimiento reducido. No cambia el diseño de la landing.
- `.vscode/tasks.json`: tarea de vista previa en el puerto 5174 para cargar correctamente las nuevas utilidades Tailwind sin interrumpir el servidor original del usuario.

## Verificaciones

- Lint sin errores ni advertencias; build correcto.
- React Doctor: sin diagnósticos nuevos respecto de la base.
- Sin desbordamiento horizontal a 320, 390, 768, 1024 y 1440 px.
- Tabs: desplazamiento lateral, selección, flechas, Home y End; conservación de mesa.
- Búsqueda de albahaca en pizzas: 2 resultados; búsqueda sin coincidencias: estado vacío y recuperación.
- Filtro vegano en pizzas: 1 resultado según los datos actuales.
- Búsqueda de gnocchi en pastas: 3 resultados.
- Modal: visible en móvil, cierre con Escape, liberación del scroll y restauración de foco al producto; mesa=7 conservada.

Las comprobaciones del navegador se realizaron durante esta sesión, no se añadió una suite E2E persistente. La advertencia de Browserslist desactualizado y los recursos externos Cloudinary que devuelven 404 siguen siendo pendientes documentados en REVISION.md; el rediseño conserva sus imágenes de reserva. No se modificaron precios, ingredientes ni el teléfono configurado para pedidos QR.

Vista previa de desarrollo: http://localhost:5174/menu
