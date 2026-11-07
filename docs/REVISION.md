# Revisión del proyecto — 2026-11-05

## Alcance

Correcciones aplicadas directamente a navegación, menú móvil, desplazamiento, estilos, sliders, detalles de productos y validación. No se han modificado credenciales ni los datos comerciales sin confirmar. No se añadieron dependencias.

## Cambios realizados

### 1. Navegación y cabecera

- `src/data/navigation.js`: destinos compartidos entre escritorio y móvil, evitando mantener listas distintas.
- `Header.jsx`: cabecera de altura estable (80 px), listener pasivo de scroll, atributos de accesibilidad del botón, cierre del menú al pasar a escritorio y comportamiento de `simple` en los detalles.
- `Navbar.jsx`: enlaces reales de React Router a `/#home`, `/#about` y `/#gallery`; funcionan desde otras rutas y permiten abrir otra pestaña. El enlace activo se calcula al desplazar manualmente, no solo al finalizar una animación de react-scroll. Se eliminaron el temporizador de 120 ms y el efecto que causaba un error de lint.
- `MenuButton.jsx`: «Ver menú» abre `/menu`, igual que los demás accesos al menú digital.
- `Footer.jsx`: «Nuestras Pizzas» apunta a `/#pizzas`; «Contacto» tiene un destino real en el footer. Los accesos de redes sin URL ya no son enlaces ficticios a `#`: aparecen deshabilitados hasta configurarlos.

### 2. Menú móvil

- `MobileMenu.jsx`: sustituido el panel trasladado fuera de pantalla por un diálogo modal nativo. Cerrado, sus enlaces no permanecen en el recorrido del teclado.
- Bloqueo y restauración del scroll del fondo; foco contenido en el diálogo y restaurado al botón de apertura.
- Cierre mediante botón, Escape, navegación y cambio a escritorio.
- Enlaces de secciones válidos incluso desde una ficha de pizza.
- Eliminada la animación de entrada anterior; se prioriza un comportamiento accesible y estable.

### 3. Desplazamiento

- `ScrollToTopSmooth.jsx`: un único controlador para cambios de ruta y anclas, con compensación por altura real de cabecera.
- Espera mediante MutationObserver a secciones cargadas con lazy, como Galería. El observador se limpia al navegar, encontrar el destino o agotar 15 segundos.
- Los cambios exclusivos de query del menú QR no reinician la posición; las rutas nuevas vuelven arriba.
- Se respeta `prefers-reduced-motion`. Eliminado el scroll suave global que competía con desplazamientos programáticos.
- `QRLayout.jsx`: incorpora el controlador, antes disponible solo en MainLayout.

### 4. Lógica de pizzas y menú QR

- `Pizzas.jsx`: eliminados el loader artificial, la espera de 600 ms y la segunda navegación que competía con Link.
- `PizzaDetail.jsx`: enlaces explícitos para volver, sin depender de `navigate(-1)`. Una entrada directa ya no devuelve al usuario fuera del sitio. En QR se conserva `mesa`. Título principal h1, movimiento reducido y fallback del dominio para metadatos.
- `MenuQR.jsx`: validación de categorías, comparación de IDs como texto y desplazamiento después del render, sin temporizador de 50 ms. Botones con estado accesible y cabecera adaptable a pantallas estrechas. Eliminado cálculo de WhatsApp sin uso.
- `PizzaDetailModal.jsx`: título accesible, botón de cierre etiquetado, Escape, restauración de foco y overflow del fondo; contenido desplazable en pantallas pequeñas. Evitadas llamadas duplicadas al cierre.

### 5. Estilos y animaciones

- `styles.css`: reglas compartidas de Swiper sin duplicaciones de fondo; hover visible, foco visible, SVG de Swiper 12, botones de 44 px y paginación con área interactiva estable. Flechas disponibles también en móvil.
- `HeroSlider.jsx`: controles accesibles en español, teclado y botón visible de pausa/reanudación. El autoplay se detiene con movimiento reducido o al enfocar controles del slider.
- `Gallery.jsx`: controles accesibles, teclado y transiciones reducidas cuando corresponde.
- `PizzaLoader.jsx`, `Menu.jsx`, `MenuSection.jsx`: imports Motion corregidos, animaciones adaptadas a movimiento reducido y eliminación de variantes sin uso. No se desactivaron reglas de lint.
- `index.css`: fondo oscuro consistente, foco visible, enlace «Saltar al contenido», márgenes para anclas y utilidad no-scrollbar que faltaba.

### 6. Recuperación y recursos

- `router.jsx`: página propia para rutas inexistentes y errorElement en todas las ramas principales.
- `RouteError.jsx`: recuperación ante errores de render/carga con reintento y retorno al inicio, sin exponer detalles internos.
- `imageFallback.js` y `public/images/placeholder.svg`: reserva local para imágenes externas fallidas, aplicada a todas las vistas de imágenes. Se elimina srcset al fallar para no reintentar el recurso roto.
- `index.html`: retirada precarga del hero con URL distinta de la usada por la aplicación; evitaba una descarga duplicada e innecesaria también en rutas QR. Retirado fetchpriority bajo del módulo principal.
- `vite.config.js`: eliminada agrupación manual de React que generaba un chunk vacío.

## Verificaciones realizadas

- `npm run lint`: correcto, frente a los 9 errores iniciales.
- `npm run build`: correcto; eliminada la advertencia del chunk React vacío.
- `git diff --check`: correcto.
- Diagnóstico React adicional en los cambios contra la base: sin diagnósticos nuevos después de añadir los límites de error. Esto no equivale a afirmar que no existe deuda técnica previa en todo el proyecto.

### Pruebas funcionales en navegador integrado

| Caso | Resultado |
| --- | --- |
| Escritorio, 1440 px: enlaces Nosotros y Galería | Sección situada debajo de la cabecera; indicador activo actualizado |
| Desbordamiento horizontal, 1440 y 390 px | No detectado |
| Menú móvil: apertura y foco | Diálogo modal, foco dentro y fondo bloqueado |
| Menú móvil: Escape | Cierra, libera scroll y devuelve foco a Abrir menú |
| Menú móvil: pasar a escritorio | Cierra y libera scroll |
| Menú móvil: Ver menú | Navega a /menu sin diálogo ni bloqueo residual |
| QR: cambiar a Pastas con mesa=7 | Conserva mesa y categoría en la URL |
| QR: abrir y cerrar producto | Conserva contexto; elimina product al cerrar |
| QR: mensaje WhatsApp del modal | Incluye producto y mesa |
| QR: restaurar foco tras Escape | Vuelve a Ver detalle |
| Categoría desconocida | Muestra pizzas |
| Detalle QR abierto directamente | Volver al menú conserva mesa=7 |
| Ruta inexistente | Muestra página 404 propia |
| Pantalla 320 px y movimiento reducido | Sin desbordamiento; navegación a Galería y autoplay detenido, repetidos desde carga limpia |
| Imagen de pasta inexistente | Muestra placeholder local cargado, no icono de imagen rota |

Las pruebas del navegador se realizaron durante esta revisión; no se añadió una suite E2E persistente ni se probaron todos los navegadores/dispositivos reales. Una prueba inicial de Galería tuvo un desfase y un script intentó leerla antes de su carga; la repetición desde carga limpia con espera de montaje pasó.

## Problemas pendientes y decisiones necesarias

1. **Cloudinary:** se observaron respuestas HTTP 404 reales para recursos como `pastas/gnocchi-sorrentina`, `pastas/gnocchi-pesto` y `pastas/carbonara` en la cuenta configurada. La reserva local evita imágenes rotas, pero no sustituye las fotos. Confirmar `VITE_CLOUDINARY_CLOUD` y los identificadores públicos de `src/data.js`. No se modificó `.env`.
2. **Datos comerciales inconsistentes:** MainLayout usa WhatsApp `56990914436`, mientras fichas y menú usan `56912345678`. También difieren dirección y horarios de la cabecera y el footer. Confirmar los datos reales antes de unificarlos; no se eligió arbitrariamente un número de pedidos.
3. **Redes sociales:** faltan URLs reales de Instagram, Facebook y WhatsApp en el bloque social del footer. Sus etiquetas quedaron deshabilitadas, no funcionales.
4. **Administración:** `/admin/mesas` es accesible sin autenticación. Si debe ser privada, requiere una solución real de autenticación y autorización; ocultar la ruta no es protección. En esta revisión no se agregó un backend ni un login ficticio.
5. **Browserslist:** build advierte que los datos caniuse-lite tienen 11 meses. No impide compilar; actualizar con `npx update-browserslist-db@latest` cuando se autorice actualizar el lockfile.
6. **Identidad/SEO:** permanecen textos y metadatos genéricos «Pizzería Italiana», un favicon de Vite y un dominio fijo de ejemplo en index.html. Confirmar marca, dominio e imágenes sociales finales antes de publicar.
7. **Cobertura:** no se verificó el envío real de pedidos/reservas, la impresión/lectura física de cada QR ni navegadores móviles reales. Los enlaces WhatsApp abren un mensaje, no implementan un sistema de pedidos.
