import test from "node:test";
import assert from "node:assert/strict";
import { buildTableMenuUrl, DEFAULT_TABLE_COUNT, MAX_TABLE_COUNT, validatePublicSiteUrl, validateTableCount } from "../src/utils/qr.js";

const site = "https://restaurant-landing-one.vercel.app";

test("normaliza un dominio HTTPS y elimina la barra final", () => {
  assert.deepEqual(validatePublicSiteUrl(`  ${site}/  `), { url: site, error: "" });
  assert.deepEqual(validatePublicSiteUrl("https://PIZZERIA.CL:443/"), { url: "https://pizzeria.cl", error: "" });
});

test("no acepta direcciones vacías, HTTP ni protocolos ejecutables", () => {
  for (const input of [undefined, null, "", "   ", "sin-dominio", "http://pizzeria.cl", "javascript:alert(1)", "data:text/html,test"]) {
    assert.ok(validatePublicSiteUrl(input).error, String(input));
    assert.equal(validatePublicSiteUrl(input).url, "");
  }
});

test("rechaza localhost, IPs y dominios reservados o inválidos", () => {
  for (const host of ["localhost", "menu.localhost", "127.0.0.1", "192.168.1.2", "10.0.0.1", "[::1]", "2130706433", "menu.local", "menu.localdomain", "menu.lan", "menu.home", "app.internal", "menu.test", "menu.invalid", "pizzeria.example", "example.com", "app.example.org", "example.net", "-pizzeria.cl", "pizzeria-.cl", "pizzeria..cl", `${"a".repeat(64)}.cl`]) {
    assert.ok(validatePublicSiteUrl(`https://${host}`).error, host);
  }
});

test("rechaza credenciales, rutas, query y fragmentos", () => {
  for (const input of ["https://usuario:clave@pizzeria.cl", `${site}/menu`, `${site}/restaurante/`, `${site}?mesa=1`, `${site}#menu`]) {
    assert.ok(validatePublicSiteUrl(input).error, input);
  }
});

test("construye un destino público con la mesa como único parámetro", () => {
  const result = buildTableMenuUrl(`${site}/`, 7);
  assert.equal(result, `${site}/menu?mesa=7`);
  const parsed = new URL(result);
  assert.equal(parsed.origin, site);
  assert.equal(parsed.pathname, "/menu");
  assert.deepEqual([...parsed.searchParams], [["mesa", "7"]]);
});

test("normaliza mesas de texto y admite los límites del panel", () => {
  assert.equal(buildTableMenuUrl(site, "01"), `${site}/menu?mesa=1`);
  assert.equal(validateTableCount(1).count, 1);
  assert.equal(validateTableCount(MAX_TABLE_COUNT).count, MAX_TABLE_COUNT);
  assert.equal(validateTableCount(DEFAULT_TABLE_COUNT).count, 12);
});

test("no genera un QR cuando el destino o la mesa no son válidos", () => {
  assert.equal(buildTableMenuUrl("https://localhost", 1), "");
  for (const mesa of [undefined, null, true, false, "", 0, -1, 1.5, "mesa7", MAX_TABLE_COUNT + 1, Infinity, NaN, {}]) {
    assert.ok(validateTableCount(mesa).error, String(mesa));
    assert.equal(buildTableMenuUrl(site, mesa), "", String(mesa));
  }
});
