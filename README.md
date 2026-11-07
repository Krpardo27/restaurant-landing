# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Herramienta local de QR por mesa

En desarrollo, abre `/admin/mesas` para configurar el dominio HTTPS publicado, elegir la cantidad de mesas e imprimir una tarjeta o el lote. El dominio inicial se obtiene de `VITE_SITE_URL`; también puede aplicarse desde el formulario sin modificar `.env`.

La herramienta no genera enlaces de localhost ni se publica en producción: el proyecto no incluye autenticación de servidor. Los QR generados localmente apuntan a la carta pública y funcionan sin publicar el panel.

Ejecuta `npm test` para comprobar las validaciones de dominios y mesas. Consulta [docs/MESAS_QR.md](docs/MESAS_QR.md) para instrucciones, límites y comprobaciones de impresión.

## Fotografías de la carta

Las fotografías que sustituían referencias rotas se sirven desde `public/menu/`, con versiones adaptadas al tamaño de pantalla. Son imágenes ilustrativas de terceros con licencias registradas; sus autores, fuentes y modificaciones se publican en `/menu/credits.html` y `/menu/manifest.json`.

Se conservaron las ocho imágenes de pizzas que ya funcionaban. Consulta [docs/IMAGENES_MENU.md](docs/IMAGENES_MENU.md) antes de reemplazar fotografías o regenerar los recursos. `npm test` también comprueba archivos, hashes, licencias y referencias del catálogo.
