# Cabecera compartida y fuentes locales

## Diferencias corregidas

Inicio tenía una cabecera de 80 px y una marca más pequeña; MenuQR usaba 96 px en escritorio y 78 px en móvil. También diferían los tamaños del logo, el espaciado, los colores de enlaces y los márgenes móviles. Un mínimo de 320 px en body añadía una diferencia de 10 px por la barra de scroll en el ancho más estrecho.

## Implementación

- `src/components/HeaderBar.jsx` y `src/styles/header.css`: única estructura y reglas de cabecera. Alto de 96 px; 78 px hasta 640 px. Contenedor máximo de 1200 px, con márgenes de 32 px por lado en escritorio y 16 px en móvil.
- `src/components/Brand.jsx`: marca compartida, con círculo de 42 px en escritorio y 36 px en móvil, idéntico tamaño de texto, separación y color en Inicio y MenuQR.
- `Header.jsx` y `MenuQR.jsx`: reutilizan ambos componentes. Se conserva la cabecera fija en Inicio y la cabecera estática en la carta; el contenido de navegación sigue correspondiendo a cada página.
- `Navbar.jsx` e `Informacion.jsx`: enlaces con tipografía y estilo compartidos de la cabecera, conservando selección activa y funcionalidad. El acceso a la carta adopta el enlace discreto de MenuQR en lugar del botón coral anterior.
- Eliminadas las reglas duplicadas de home-brand, menu-brand, home-header-row y otros estilos de cabecera que podían volver a desalinearlas.
- Tokens globales `--site-header-height` y `--site-header-gutter`; el hero y las anclas compensan la nueva altura. El controlador de desplazamiento ya consulta la altura real del header.
- `scrollbar-gutter: stable` y retirada del mínimo rígido de body para evitar saltos laterales y alinear cabeceras fijas y estáticas a 320 px.

## Tipografía

Instaladas mediante npm, sin peticiones a Google Fonts en ejecución:

- `@fontsource-variable/dm-sans`: DM Sans Variable para navegación, cuerpo, botones y datos; estilos normal e italic.
- `@fontsource/dm-serif-display`: DM Serif Display para títulos, acentos editoriales y marca; normal e italic.

Imports globales en main.jsx, tokens `--font-sans`/`--font-display` en index.css y familias sans/serif de Tailwind actualizadas. Se sustituyeron las referencias directas a Georgia de los estilos de Inicio y MenuQR por el token editorial. Georgia queda únicamente como fallback. El título del modal usa font-serif en vez de una fuente inline.

Se retiraron las conexiones preconnect a Google Fonts que ya no se usan. No se modificó la fuente del editor de VS Code, solo la de la web.

## Validación

Las fuentes locales se empaquetan correctamente en build. En navegador se confirmó la carga de DM Sans, DM Serif Display y los estilos editoriales. Las medidas de marca y cabecera se compararon entre ambas rutas en móvil, tablet y escritorio, incluyendo 320 px. Los resultados de navegación y validación de código se comunicaron al finalizar la tarea.

Medidas confirmadas al comparar Inicio y MenuQR (la medición a 1024 px se repitió tras completarse la carga):

| Pantalla | Alto | Marca circular | Margen mínimo lateral |
| --- | --- | --- | --- |
| 320 / 390 px | 78 px | 36 px | 16 px |
| 768 / 1024 px | 96 px | 42 px | 32 px |
| 1440 px | 96 px | 42 px | Contenedor de 1200 px centrado |

Sin desbordamiento horizontal en los anchos comprobados.

Esta actualización sustituye las medidas de 80 px de cabecera y 92 px de compensación descritas en el informe histórico REDISENO_INICIO.md. La compensación actual es altura real + 12 px: 108 px en escritorio y 90 px en móvil.

Lint y build finales correctos; VS Code sin errores y diagnóstico React sin problemas nuevos respecto de la base. La comprobación interactiva de clic quedó limitada por la pestaña oculta del navegador integrado; no se presenta como una prueba manual superada. Las comprobaciones de geometría y carga de fuentes se realizaron independientemente de ese clic.

## Advertencias de dependencias

Tras instalar las fuentes, npm audit informa 15 vulnerabilidades en otras dependencias del árbol: 1 baja, 3 moderadas y 11 altas, sin críticas. Entre las dependencias directas señaladas figuran Vite, react-router-dom y PostCSS; los paquetes de fuentes no aparecen en el informe de vulnerabilidades. No se ejecutó npm audit fix ni se actualizaron dependencias ajenas a esta solicitud para evitar cambios incompatibles.

Build conserva el aviso de Browserslist desactualizado, independiente de las fuentes.
