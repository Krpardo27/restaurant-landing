import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import { menuSections } from "../src/data.js";
import { menuImages, menuItemImages } from "../src/data/menuImages.js";

const readJson = async (path) => JSON.parse((await fs.readFile(path, "utf8")).replace(/^\uFEFF/, ""));
const manifest = await readJson("public/menu/manifest.json");
const audit = await readJson("scripts/menu-assets/cloudinary-audit.json");
const items = Object.values(menuSections).flatMap((section) => section.items);
const broken = new Map(audit.items.filter((item) => item.status === 404).map((item) => [item.id, item]));
if (Object.keys(menuItemImages).length !== broken.size) throw new Error("Incomplete image coverage");

for (const entry of manifest) {
  if (!/^https:\/\/creativecommons\.org\/(licenses\/by(?:-sa)?\/|publicdomain\/zero\/)/.test(entry.licenseUrl)) throw new Error("Unverified license URL");
  for (const variant of entry.variants) {
    const bytes = await fs.readFile(`public${variant.src}`);
    if (createHash("sha256").update(bytes).digest("hex") !== variant.sha256) throw new Error(`Asset integrity mismatch: ${variant.src}`);
  }
}

let source = await fs.readFile("src/data.js", "utf8");
let updated = 0;
for (const [id, image] of Object.entries(menuItemImages)) {
  const item = items.find((product) => product.id === id);
  if (!item || !broken.has(id) || !menuImages[image]) throw new Error(`Invalid image mapping: ${id}`);
  if (item.image === image) continue;
  if (item.image !== broken.get(id).image) throw new Error(`Image changed since audit; refusing to overwrite: ${id}`);
  const needle = `image: ${JSON.stringify(item.image)}`;
  if (source.split(needle).length !== 2) throw new Error(`Ambiguous source replacement: ${id}`);
  source = source.replace(needle, `image: ${JSON.stringify(image)}`);
  updated++;
}

const escape = (text) => String(text ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const cards = manifest.map((entry) => {
  const thumbnail = entry.variants[0];
  const dishes = entry.itemIds.map((id) => items.find((item) => item.id === id)?.name || id).join(" · ");
  return `    <article id="${escape(entry.creditId)}">
      <img src="${escape(thumbnail.src)}" width="${thumbnail.width}" height="${thumbnail.height}" alt="${escape(entry.alt)}" loading="lazy">
      <div><h2>${escape(dishes)}</h2>
      <p><strong>Autor:</strong> ${escape(entry.author)}</p>
      <p><strong>Obra:</strong> ${escape(entry.title || entry.commonsTitle)}</p>
      <p><a href="${escape(entry.sourcePage)}" target="_blank" rel="noopener noreferrer">Archivo original y atribución en Wikimedia Commons</a></p>
      <p><strong>Licencia:</strong> <a href="${escape(entry.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escape(entry.license)}</a></p>
      <p><strong>Modificaciones:</strong> ${escape(entry.modifications)}</p>
      <p class="note">${escape(entry.note)}</p>
      <p><a href="${escape(entry.file)}" target="_blank" rel="noopener noreferrer">Abrir fotografía local</a></p></div>
    </article>`;
}).join("\n");

const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Créditos de fotografías de la carta | Nova</title>
  <meta name="description" content="Autores, fuentes y licencias de las fotografías ilustrativas utilizadas en la carta de Nova.">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <style>
    *{box-sizing:border-box}html{scroll-margin-top:24px}body{margin:0;background:#11100f;color:#f5f0e8;font:15px/1.75 system-ui,sans-serif}main{width:min(1100px,calc(100% - 40px));margin:auto;padding:36px 0 60px}nav{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:30px}a{color:#ffb19d;text-underline-offset:4px}a:hover{color:#fff}a:focus-visible{outline:2px solid #f47058;outline-offset:4px}h1{font:400 clamp(32px,5vw,50px)/1.15 Georgia,serif;margin:0 0 24px}h2{font-size:20px;line-height:1.4;margin:0 0 14px}p{margin:8px 0;overflow-wrap:anywhere}header{max-width:850px;margin-bottom:36px}header p,.note{color:#c2b6a9}article{display:grid;grid-template-columns:minmax(0,230px) minmax(0,1fr);gap:26px;border-top:1px solid #4a3d31;padding-block:30px;scroll-margin-top:20px}article img{display:block;max-width:100%;width:100%;height:auto;max-height:230px;object-fit:contain;background:#fff;border-radius:8px}footer{border-top:1px solid #4a3d31;margin-top:30px;padding-top:24px;color:#c2b6a9}@media(max-width:650px){article{grid-template-columns:minmax(0,1fr);gap:18px}article img{width:auto;max-width:100%;max-height:200px}main{width:calc(100% - 32px)}}
  </style>
</head>
<body>
<main>
  <nav aria-label="Volver al sitio"><a href="/menu">Volver a la carta</a><a href="/">Inicio de Nova</a></nav>
  <header><h1>Créditos de fotografías</h1>
    <p>Estas fotografías son <strong>ilustrativas de preparaciones relacionadas</strong>: no son fotografías de los platos del restaurante y pueden mostrar otra presentación, tamaño, adorno o variante. Para elegir un plato, consulta su descripción e ingredientes.</p>
    <p>Se distribuyen copias locales y versiones redimensionadas de ${manifest.length} fotografías obtenidas de Wikimedia Commons. Cada fotografía y sus variantes conservan la licencia indicada a continuación. No se presupone permiso sobre las marcas que puedan aparecer ni patrocinio de sus titulares.</p>
    <p>El registro de archivos, tamaños y huellas de integridad está disponible en <a href="/menu/manifest.json">el manifiesto de imágenes</a>.</p>
  </header>
${cards}
  <footer><p>Las atribuciones enlazan al archivo concreto y a su licencia, no a una búsqueda genérica. Si sustituyes una fotografía, actualiza su atribución y conserva las obligaciones de la nueva licencia.</p><p><a href="/menu">Volver a la carta de Nova</a></p></footer>
</main>
</body>
</html>
`;

await fs.writeFile("src/data.js", source);
await fs.writeFile("public/menu/credits.html", html);
console.log(`Updated ${updated} image references; ${manifest.length} photographs cover ${Object.keys(menuItemImages).length} dishes. Credits generated.`);
