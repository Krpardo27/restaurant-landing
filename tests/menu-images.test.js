import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { menuSections } from "../src/data.js";
import { menuImages, menuItemImages } from "../src/data/menuImages.js";
import { getImageAlt, getImageCreditsUrl, isLocalImage, localImageSrcSet, resolveLocalImage } from "../src/utils/menuImageSources.js";

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8").replace(/^\uFEFF/, ""));
const manifest = readJson("public/menu/manifest.json");
const audit = readJson("scripts/menu-assets/cloudinary-audit.json");
const products = Object.values(menuSections).flatMap((section) => section.items);

test("los 35 platos con enlaces rotos ahora tienen fotografías locales", () => {
  const previouslyBroken = audit.items.filter((item) => item.status === 404);
  assert.equal(previouslyBroken.length, 35);
  assert.equal(Object.keys(menuItemImages).length, previouslyBroken.length);
  for (const item of previouslyBroken) {
    const product = products.find((candidate) => candidate.id === item.id);
    assert.equal(product.image, menuItemImages[item.id], item.id);
    assert.ok(isLocalImage(product.image), item.id);
    assert.ok(fs.existsSync(`public${product.image}`), product.image);
  }
});

test("se conservan sin cambios las ocho imágenes válidas de pizzas", () => {
  const valid = audit.items.filter((item) => item.status === 200);
  assert.equal(valid.length, 8);
  for (const item of valid) {
    assert.equal(products.find((product) => product.id === item.id).image, item.image);
    assert.equal(menuItemImages[item.id], undefined);
  }
});

test("las 30 fuentes tienen licencia, autor, atribución y cobertura inequívocas", () => {
  assert.equal(manifest.length, 30);
  const ids = new Set();
  const credits = fs.readFileSync("public/menu/credits.html", "utf8");
  for (const image of manifest) {
    assert.match(image.license, /^(CC0|CC BY(?:-SA)? [1-4]\.0)$/);
    assert.match(image.licenseUrl, /^https:\/\/creativecommons\.org\/(licenses\/by(?:-sa)?\/[1-4]\.0\/|publicdomain\/zero\/1\.0\/)$/);
    assert.match(image.sourcePage, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.ok(image.author.trim());
    assert.doesNotMatch(image.author, /<[^>]+>/);
    assert.ok(image.modifications);
    assert.ok(image.note);
    assert.ok(credits.includes(`id="${image.creditId}"`));
    assert.ok(credits.includes(image.licenseUrl));
    for (const id of image.itemIds) {
      assert.ok(!ids.has(id), `Duplicate product: ${id}`);
      ids.add(id);
      assert.equal(menuItemImages[id], image.file);
    }
  }
  assert.equal(ids.size, 35);
});

test("los 88 JPEG existen, son íntegros y tienen dimensiones declaradas coherentes", () => {
  let count = 0;
  const files = new Set();
  for (const image of manifest) {
    const widths = image.variants.map((variant) => variant.width);
    assert.deepEqual(widths, [...widths].sort((a, b) => a - b));
    assert.equal(new Set(widths).size, widths.length);
    assert.ok(Math.max(...widths) <= Math.min(960, image.sourceWidth));
    assert.equal(menuImages[image.file].creditId, image.creditId);
    assert.equal(menuImages[image.file].alt, image.alt);
    assert.deepEqual(menuImages[image.file].variants, image.variants.map(({ src, width, height }) => ({ src, width, height })));
    for (const variant of image.variants) {
      assert.match(variant.src, /^\/menu\/[a-z]+\/[a-z0-9-]+\.jpg$/);
      assert.ok(!files.has(variant.src));
      files.add(variant.src);
      const buffer = fs.readFileSync(`public${variant.src}`);
      assert.equal(buffer[0], 0xff);
      assert.equal(buffer[1], 0xd8);
      assert.equal(buffer[buffer.length - 2], 0xff);
      assert.equal(buffer[buffer.length - 1], 0xd9);
      assert.equal(buffer.length, variant.bytes);
      assert.equal(createHash("sha256").update(buffer).digest("hex"), variant.sha256);
      assert.ok(Math.abs(variant.height - variant.width * image.sourceHeight / image.sourceWidth) <= 1);
      count++;
    }
  }
  assert.equal(count, 88);
});

test("el cargador elige tamaños reales, sin inventar anchos ni ampliar fuentes pequeñas", () => {
  const product = products.find((item) => item.id === "gnocchi-pesto");
  const source = product.image;
  const variants = menuImages[source].variants;
  assert.equal(resolveLocalImage(source, 100), variants[0].src);
  assert.equal(resolveLocalImage(source, 480), variants.find((variant) => variant.width >= 480).src);
  assert.equal(resolveLocalImage(source, 1600), variants[variants.length - 1].src);
  assert.equal(localImageSrcSet(source), variants.map((variant) => `${variant.src} ${variant.width}w`).join(", "));
  const lemonade = menuImages[products.find((item) => item.id === "limonada").image];
  assert.ok(Math.max(...lemonade.variants.map((variant) => variant.width)) < 640);
});

test("las rutas locales desconocidas son seguras y no interfieren con Cloudinary", () => {
  assert.equal(resolveLocalImage("/images/placeholder.svg", 320), "/images/placeholder.svg");
  assert.equal(localImageSrcSet("/images/placeholder.svg"), undefined);
  assert.equal(resolveLocalImage("pizzas/imagen-existente", 320), undefined);
  assert.equal(localImageSrcSet("pizzas/imagen-existente"), undefined);
  assert.equal(isLocalImage("//otro-dominio/imagen.jpg"), false);
  assert.equal(isLocalImage(undefined), false);
});

test("los textos y créditos describen la foto de referencia, no una receta inventada", () => {
  const source = products.find((item) => item.id === "angioletti-nutella").image;
  assert.match(getImageAlt(source, "fallback"), /Masa frita con chocolate/);
  assert.match(getImageAlt(source, "fallback"), /imagen ilustrativa/);
  assert.match(getImageCreditsUrl(source), /^\/menu\/credits\.html#postres-/);
  assert.equal(getImageAlt("pizzas/propia", "Foto del plato"), "Foto del plato");
  assert.equal(getImageCreditsUrl("pizzas/propia"), undefined);
});
