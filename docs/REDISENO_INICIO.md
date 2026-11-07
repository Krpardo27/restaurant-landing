# Rediseño del inicio — Nova

## Identidad visual

Inicio alineado con la carta digital: fondo oscuro cálido, acento coral, títulos editoriales con Georgia y fotografía protagonista. El catálogo introduce un capítulo claro para mejorar la jerarquía y evitar una sucesión de bloques oscuros idénticos. Se usan fuentes del sistema, sin nuevas dependencias ni descargas de fuentes.

## Componentes modificados

- **Home:** conserva el orden Hero → Pizzas → About → HeroSlider → Gallery; carga diferida de Galería con espacio y estado de carga en vez de fallback vacío. Título y descripción propios mediante Helmet.
- **Hero:** composición de texto y fotografía, mensaje «La buena pizza no tiene prisa», dos accesos reales a carta y pizzas, sello de 48 h basado en el contenido previo y franja de identidad artesanal. Fotografía con prioridad alta y dimensiones reservadas.
- **Pizzas:** catálogo claro, ocho productos originales, tarjetas con fotos enlazadas al detalle, precio separado, etiquetas según datos existentes y pedidos mediante enlaces reales de WhatsApp. Una, dos o cuatro columnas según ancho.
- **About:** historia más breve, fotografía con pie editorial y tres valores: masa, ingredientes y horno. Acceso a la carta.
- **HeroSlider:** imagen editorial, contador, anterior/siguiente y pausa/reanudación. El autoplay se detiene al entrar con foco, ocultar la pestaña o salir del área visible; respeta movimiento reducido. Reanudar es una acción explícita y funcional. Solo el enlace de la diapositiva activa entra en el recorrido del teclado.
- **useExperienceCarousel:** estado y efectos separados del diseño; detección de visibilidad, edición de campos y preferencia de movimiento, sin desactivar reglas de validación.
- **Gallery:** mosaico fotográfico responsive de cuatro imágenes, pies de foto y reserva. Se retiró el segundo carrusel para no duplicar comportamientos en el inicio.
- **Header / Navbar / Informacion:** marca Nova, altura fija de 80 px, CTA de carta y navegación a Inicio, Pizzas, Nosotros, Galería y Contacto. El indicador se actualiza con scroll y contempla el contacto cuando está al final de una página que no permite alinearlo arriba.
- **MobileMenu:** mismo diálogo accesible con nuevo aspecto, enlaces numerados, acceso a carta y controles de 44 px. Se conserva Escape, foco contenido, restauración de foco y bloqueo del fondo.
- **Footer:** reserva por WhatsApp, navegación, horarios y contacto con tel/mailto funcionales; crédito y año preservados. No se inventaron URLs de redes sociales.
- **MainLayout:** estilos encapsulados en landing-shell y botón flotante de pedido más discreto, sin etiqueta visual en pantallas estrechas pero con nombre accesible.
- **Favicon:** icono local Nova en lugar del icono de Vite.
- **Editor:** datos CSS locales de Tailwind en `.vscode/tailwindcss-data.json` y referencia en settings para reconocer @tailwind/@apply/@screen/@config sin desactivar la validación CSS. Panel de problemas final sin errores.
- **Limpieza incidental:** eliminados orderMessage y waLink sin uso en MenuQR después de retirarse su bloque visual; no se restauró ni alteró el diseño actual de la carta.

## Archivos de estilos

- `src/styles/landing.css`: identidad, cabecera, hero, catálogo, menú móvil y utilidades compartidas del inicio.
- `src/styles/home-story.css`: historia y galería.
- `src/styles/home-experience.css`: carrusel y footer.

Las clases no alteran el diseño de la carta QR; la cabecera y el footer compartidos sí se muestran con su nueva identidad en el detalle de pizza del sitio principal.

## Validaciones realizadas

- Lint y compilación correctos; diagnóstico React sobre cambios respecto de la base sin errores ni advertencias nuevas.
- Sin desbordamiento horizontal a 320, 390, 768, 1024 y 1440 px. Catálogo de una columna móvil, dos en tablet y cuatro desde 1024 px.
- Un solo h1 y destinos reales para todos los enlaces de ancla del inicio.
- Pizzas, Nosotros y Galería llegan a unos 92 px del borde superior con cabecera de 80 px; indicador activo correcto.
- Contacto visible y seleccionado al alcanzar el final de página.
- Menú móvil: apertura programática, cinco enlaces, foco dentro y fondo bloqueado. Escape programático cierra, libera fondo y devuelve el foco a Abrir menú.
- Carrusel: siguiente diapositiva actualiza índice y contador a 02 / 04; autoplay detenido con movimiento reducido.
- Producto: enlace real a `/pizza/margherita-clasica`, detalle cargado y retorno explícito a `/#pizzas`.
- El navegador integrado marcó la pestaña como oculta durante algunas pruebas: los clics/teclas que dependían de estabilidad visual quedaron bloqueados. Se documentan las pruebas programáticas como tales; no sustituyen una revisión manual completa en dispositivos reales.

## Pendientes anteriores que no se inventaron ni resolvieron arbitrariamente

- Sigue pendiente confirmar el teléfono comercial: el botón flotante mantiene el número previo de MainLayout; el catálogo y las reservas conservan los suyos.
- Se preservaron los horarios y la dirección del footer. Se retiró su duplicación contradictoria en la antigua cabecera, pero no se aseguró que los datos comerciales sean reales.
- Algunas imágenes externas de Cloudinary pueden devolver 404; se conservan las reservas locales.
- Build mantiene el aviso de datos Browserslist antiguos. No se actualizaron dependencias ni el lockfile.
- No se enviaron pedidos ni reservas reales.

Vista previa de desarrollo: http://localhost:5174/
