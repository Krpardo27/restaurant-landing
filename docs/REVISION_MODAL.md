# Revisión del detalle de producto

## Cambios

- Se mantiene la API `PizzaDetailModal({ pizza, mesa, onClose })` para no romper la carta, aunque el componente muestra cualquier tipo de producto.
- React Icons: FiX para cierre, FaWhatsapp para el pedido, FiArrowUpRight para salida externa, FiHash para mesa, FiList para ingredientes y FaPepperHot/FaLeaf para características. Los iconos decorativos están ocultos a lectores de pantalla; las acciones conservan nombres y texto visibles.
- Cabecera y acción de pedido permanecen visibles. Solo el cuerpo se desplaza, evitando perder el cierre o el precio al consultar ingredientes largos.
- Estilos propios en `src/styles/product-modal.css`; eliminada la regla duplicada de tamaño del modal en menu.css. El componente ya no depende de estar dentro de digital-menu para tener tamaño correcto.
- Foco inicial en el título; IDs únicos con useId para título y descripción. El diálogo nativo contiene el foco y vuelve al botón de apertura. Si se abre por URL, se utiliza la pestaña activa como retorno accesible cuando no hay botón previo.
- Escape, botón y fondo cierran mediante la misma acción del padre. El fondo requiere que el gesto empiece y termine fuera: arrastrar desde el interior no cierra por accidente.
- Los eventos de fondo se registran con la API nativa y se retiran al limpiar el efecto, sin asignar al contenedor roles falsos de botón ni desactivar reglas de accesibilidad.
- Se conserva y restaura el overflow previo del documento al abrir/cerrar o desmontar.
- Mensaje WhatsApp genérico: «quiero pedir [producto]», sin artículo fijo ni emoji de pizza para una bebida o postre. Mantiene el número de mesa y codifica el texto. El teléfono existente no se modifica.
- Abrir WhatsApp no cierra automáticamente el modal ni elimina el producto: se conserva el contexto al volver. El enlace solo prepara un mensaje; no confirma ni envía un pedido automáticamente.
- Ingredientes como lista semántica y etiquetas solo cuando existen. Se tolera una lista ausente o mal tipada sin provocar un error de join/map.
- Se mantienen fotos locales, srcset, textos alternativos, fallback, créditos y ajuste contain para bebidas. Si falta una imagen se usa el placeholder del cargador existente.

## Verificaciones

- 14 pruebas existentes correctas; lint y build correctos.
- React Doctor sobre cambios respecto de la base: sin errores ni advertencias nuevas.
- Apertura como modal nativo, bloqueo del fondo, título enfocado y descripción accesible.
- Pantallas 320×740, 390×844, 768×900, 1440×1000 y 844×390: sin desbordamiento; cierre y pedido visibles. El cuerpo puede desplazarse en los tamaños con altura limitada.
- Escape cierra y restaura overflow y foco. La mesa permanece en la URL.
- Apertura desde tarjeta y cierre programático por fondo: retorna a «Ver detalle de Gnocchi alla Sorrentina».
- Gesto iniciado dentro y terminado fuera: conserva el diálogo abierto.
- Tab recorre créditos, pedido y cierre sin escapar al documento de fondo.
- Coca-Cola: imagen contain, crédito correcto y mensaje «Hola, estoy en la mesa 3 y quiero pedir Coca-Cola.».

Las comprobaciones de diálogo se realizaron en navegador durante esta sesión; la prueba del gesto de fondo incluyó eventos programáticos. Las 14 pruebas de Node cubren las validaciones de QR e imágenes existentes, no sustituyen una suite E2E persistente del modal. No se enviaron mensajes ni pedidos reales.
