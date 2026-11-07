# Fotografías locales de la carta

## Resultado

- Auditoría inicial: 43 productos, 8 fotos válidas de pizzas y 35 referencias de Cloudinary con HTTP 404.
- Se conservaron sin cambios las ocho fotos válidas.
- Se descargaron **30 fotografías** para cubrir los **35 productos** restantes. Algunas variantes comparten una fuente, sin duplicar archivos.
- **88 JPEG**, aproximadamente **6,40 MiB** en total, bajo `public/menu/`, organizados por categoría.
- Variantes de 320, 640 y hasta 960 px; las fuentes pequeñas no se amplían. Se preserva la proporción original y se utiliza JPEG con calidad 84.
- La aplicación elige tamaños reales mediante srcset; no descarga la versión grande para cada miniatura.
- No se instalaron dependencias nuevas ni se modificaron precios, ingredientes, nombres de platos, teléfonos o `.env`.

## Carácter ilustrativo y licencias

Las fotografías son de preparaciones relacionadas, **no de los productos reales del restaurante**. La carta y los detalles muestran ese aviso y enlazan a la atribución.

Se eligieron fuentes de Wikimedia Commons con licencias CC BY, CC BY-SA o CC0. No se seleccionaron licencias NC/ND ni archivos con licencia no identificada. Se verificaron los metadatos de cada archivo concreto antes de descargarlo. Las fotografías y todas sus variantes conservan la licencia indicada.

- Créditos públicos: `/menu/credits.html`.
- Registro completo: `/menu/manifest.json`, con fuente, autor, licencia, enlaces, modificaciones, variantes, tamaños y SHA-256.
- Manifiesto de carga de la aplicación: `src/data/menuImages.js`.

**Coincidencias aproximadas:** los angioletti usan una referencia de churros con chocolate; algunos cannoli y helados comparten foto de la misma familia; hay referencias de bruschetta, pizza frita y gnocchi con una receta diferente. Los envases de bebidas también pueden diferir en diseño o volumen. Las diferencias se describen en cada crédito y no se cambiaron los ingredientes del catálogo para adaptarlos a la fotografía. Las imágenes no deben usarse para deducir alérgenos, cantidades o ingredientes.

Para mostrar la preparación exacta y sus porciones, sustituye las referencias por fotografías propias del restaurante. Las marcas que aparecen en envases no implican patrocinio ni concesión de derechos de marca por parte de la licencia fotográfica.

## Integración

- `src/data.js`: reemplazadas únicamente las 35 propiedades de imagen que fallaban.
- `src/utils/menuImageSources.js`: selección de tamaño local, srcset, texto alternativo y enlace de crédito.
- `src/utils/cloudinary.js`: mantiene los mismos exports y transformaciones para las fotos remotas; reconoce rutas locales y no las envía a Cloudinary.
- `ImageCredit.jsx`: aviso y acceso a licencia de cada foto nueva.
- `MenuSection.jsx` y `PizzaDetailModal.jsx`: imágenes locales, textos descriptivos de la foto real y créditos. Las bebidas utilizan object-fit contain para no cortar el envase.
- `MenuQR.jsx`: aviso general y acceso a créditos desde cabecera de contenido y footer.

## Comprobaciones

- `npm test`: **14 pruebas correctas**: siete de QR ya existentes y siete de cobertura, licencias, rutas, tamaños, hashes y resolución de imágenes.
- `npm run lint` y `npm run build`: correctos.
- Diagnóstico React sobre cambios respecto de la base: sin errores ni advertencias nuevas.
- Validación System.Drawing: 88 archivos decodificados como JPEG, dimensiones, proporción y SHA-256 correctos.
- Auditoría final: 43 destinos válidos, sin referencias rotas.
- Navegador: ocho categorías, 43 imágenes cargadas y cero placeholders o respuestas HTTP fallidas. 35 imágenes son locales y ocho conservan Cloudinary.
- Detalle de gnocchi: variante local de 640 px, crédito correcto y número de mesa conservado en WhatsApp; sin desbordamiento móvil en la comprobación.
- Producción: fotos locales de pastas cargadas y 30 entradas de créditos servidas correctamente.

## Mantenimiento

- `node scripts/integrate-menu-images.mjs`: regenera la página de créditos y aplica las referencias auditadas; valida hashes y evita sobrescribir imágenes que se hayan cambiado manualmente. Es idempotente con las referencias actuales.
- `scripts/download-menu-images.ps1 -ValidateOnly`: valida los JPEG y el manifiesto sin red ni nuevas descargas.
- `scripts/download-menu-images.ps1`: actualiza metadatos y descarga fuentes verificadas. Requiere PowerShell en Windows y conexión; Wikimedia puede limitar peticiones. Evita ejecutarlo innecesariamente.
- `scripts/audit-menu-images.ps1`: comprueba archivos locales y destinos remotos; escribe `scripts/menu-assets/current-image-audit.json` sin borrar el informe original.
- `scripts/menu-assets/cloudinary-audit.json` se conserva como inventario inicial para trazabilidad y pruebas. Los archivos de candidatos registran la selección previa.

Si reemplazas una foto por otra de terceros, actualiza la atribución, fuente, licencia, variantes y hashes antes de publicar. No borres los créditos mientras sigas usando esos recursos.

Las ocho imágenes de pizzas y las fotografías del inicio continúan dependiendo de la configuración de Cloudinary; solo se sustituyeron los 35 destinos fallidos de la carta.
