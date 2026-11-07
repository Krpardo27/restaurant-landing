export const DEFAULT_TABLE_COUNT = 12;
export const MAX_TABLE_COUNT = 100;

const reservedHost = /(^|\.)(localhost|local|localdomain|lan|home|internal|test|invalid|example)$/i;
const exampleHost = /(^|\.)example\.(com|net|org)$/i;

export const validatePublicSiteUrl = (value) => {
  const input = typeof value === "string" ? value.trim() : "";
  if (!input) return { url: "", error: "Introduce la dirección HTTPS de tu sitio publicado." };

  let parsed;
  try {
    parsed = new URL(input);
  } catch {
    return { url: "", error: "Introduce una dirección válida, por ejemplo https://tu-pizzeria.cl." };
  }

  if (parsed.protocol !== "https:") return { url: "", error: "La dirección pública debe comenzar con https://." };
  if (parsed.username || parsed.password) return { url: "", error: "La dirección no debe incluir usuario ni contraseña." };

  const hostname = parsed.hostname.replace(/\.$/, "").toLowerCase();
  const labels = hostname.split(".");
  const isIp = hostname.includes(":") || /^[\d.]+$/.test(hostname);
  const validLabels = hostname.length <= 253 && labels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
  if (labels.length < 2 || !validLabels || isIp || reservedHost.test(hostname) || exampleHost.test(hostname)) {
    return { url: "", error: "Usa un dominio público, no localhost, una IP ni un dominio de pruebas." };
  }
  if (parsed.pathname !== "/" || parsed.search || parsed.hash) {
    return { url: "", error: "Usa solo el dominio, sin /menu, rutas, parámetros ni fragmentos." };
  }

  parsed.hostname = hostname;
  return { url: parsed.origin, error: "" };
};

export const validateTableCount = (value) => {
  const count = typeof value === "string" || typeof value === "number" ? Number(value) : NaN;
  if (!Number.isSafeInteger(count) || count < 1 || count > MAX_TABLE_COUNT) {
    return { count: 0, error: `Elige un número entero entre 1 y ${MAX_TABLE_COUNT}.` };
  }
  return { count, error: "" };
};

export const buildTableMenuUrl = (siteUrl, mesa) => {
  const site = validatePublicSiteUrl(siteUrl);
  const table = validateTableCount(mesa);
  if (site.error || table.error) return "";
  const url = new URL("/menu", site.url);
  url.searchParams.set("mesa", String(table.count));
  return url.toString();
};
