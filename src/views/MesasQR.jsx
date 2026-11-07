import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiArrowUpRight, FiPrinter } from "react-icons/fi";
import Brand from "../components/Brand";
import HeaderBar from "../components/HeaderBar";
import QRGenerator from "../components/QRGenerator";
import ScrollToTopSmooth from "../components/ScrollToTopSmooth";
import { buildTableMenuUrl, DEFAULT_TABLE_COUNT, MAX_TABLE_COUNT, validatePublicSiteUrl, validateTableCount } from "../utils/qr";
import "../styles/mesas-qr.css";

const configuredSiteUrl = import.meta.env.VITE_SITE_URL || "";
const initialSite = validatePublicSiteUrl(configuredSiteUrl);

const clearPrintSelection = (root) => {
  if (!root) return;
  root.removeAttribute("data-print-mode");
  root.querySelectorAll("[data-print-selected]").forEach((card) => card.removeAttribute("data-print-selected"));
};

const MesasQR = () => {
  const [siteInput, setSiteInput] = useState(initialSite.url || configuredSiteUrl);
  const [siteUrl, setSiteUrl] = useState(initialSite.url);
  const [siteError, setSiteError] = useState(configuredSiteUrl ? initialSite.error : "");
  const [countInput, setCountInput] = useState(String(DEFAULT_TABLE_COUNT));
  const [tableCount, setTableCount] = useState(DEFAULT_TABLE_COUNT);
  const [countError, setCountError] = useState("");
  const printRootRef = useRef(null);
  const [status, setStatus] = useState("");
  const pendingSite = validatePublicSiteUrl(siteInput);
  const hasPendingSite = pendingSite.url !== siteUrl || Boolean(pendingSite.error);
  const ready = Boolean(siteUrl) && !hasPendingSite;
  const mesas = Array.from({ length: tableCount }, (_, index) => index + 1);
  const hostname = siteUrl ? new URL(siteUrl).host : "Dominio sin configurar";

  useEffect(() => {
    const resetPrintTarget = () => clearPrintSelection(printRootRef.current);
    window.addEventListener("afterprint", resetPrintTarget);
    return () => window.removeEventListener("afterprint", resetPrintTarget);
  }, []);

  const applySite = (event) => {
    event.preventDefault();
    if (pendingSite.error) {
      setSiteError(pendingSite.error);
      setStatus("");
      return;
    }
    setSiteUrl(pendingSite.url);
    setSiteInput(pendingSite.url);
    setSiteError("");
    setStatus("Dirección aplicada. Revisa el destino y prueba un QR antes de imprimir el lote.");
  };

  const applyCount = (event) => {
    event.preventDefault();
    const result = validateTableCount(countInput);
    if (result.error) {
      setCountError(result.error);
      return;
    }
    setTableCount(result.count);
    setCountInput(String(result.count));
    setCountError("");
    setStatus(`Se muestran ${result.count} mesas. Los cambios de cantidad se mantienen solo durante esta sesión.`);
  };

  const printCards = (mesa = null) => {
    if (!ready) return;
    const root = printRootRef.current;
    if (!root) return;
    // These print-only attributes are owned by this imperative browser action,
    // not React state. They must be ready before print() snapshots the page.
    root.dataset.printMode = mesa === null ? "all" : "single";
    root.querySelectorAll("[data-mesa]").forEach((card) => {
      if (Number(card.dataset.mesa) === mesa) card.dataset.printSelected = "true";
      else card.removeAttribute("data-print-selected");
    });
    setStatus(mesa === null ? "Abriendo la impresión de todas las mesas." : `Abriendo la impresión de la mesa ${mesa}.`);
    try {
      window.print();
    } catch {
      clearPrintSelection(root);
      setStatus("No se pudo abrir la impresión. Prueba desde un navegador de escritorio.");
    }
  };

  return (
    <div ref={printRootRef} className="qr-admin" data-ready={ready}>
      <Helmet>
        <title>Mesas y códigos QR | Nova</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <ScrollToTopSmooth />
      <div className="qr-screen-only">
        <HeaderBar>
          <Brand to="/#home" />
          <Link to="/menu" className="site-header-link">Ver carta <FiArrowUpRight aria-hidden="true" /></Link>
        </HeaderBar>
      </div>

      <main className="qr-admin-container">
        <header className="qr-admin-heading qr-screen-only">
          <div>
            <p className="qr-admin-eyebrow">Herramienta local · Solo desarrollo</p>
            <h1>Códigos QR por mesa</h1>
            <p>Prepara las tarjetas de tu local. Cada código abre la carta con su número de mesa.</p>
          </div>
          <button type="button" className="qr-action qr-action-primary" disabled={!ready} onClick={() => printCards()}>
            <FiPrinter aria-hidden="true" /> Imprimir todas ({tableCount})
          </button>
        </header>

        <div className="qr-admin-config qr-screen-only">
          <form className="qr-config-site" onSubmit={applySite} noValidate>
            <label htmlFor="qr-site-url">Dirección del sitio publicado</label>
            <p id="qr-site-help">Se usa en los QR, no la dirección local desde la que estás trabajando.</p>
            <div className="qr-field-action">
              <input
                id="qr-site-url"
                type="url"
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={siteInput}
                placeholder="https://tu-pizzeria.cl"
                aria-describedby={`qr-site-help${siteError ? " qr-site-error" : ""}`}
                aria-invalid={Boolean(siteError)}
                onChange={(event) => { setSiteInput(event.target.value); setSiteError(""); setStatus(""); }}
              />
              <button type="submit" className="qr-action">Aplicar dirección</button>
            </div>
            {siteError && <p id="qr-site-error" className="qr-error" role="alert">{siteError}</p>}
            <p className="qr-config-note">Puedes fijarla para futuras visitas con <code>VITE_SITE_URL</code>. No se modifica tu archivo .env desde esta pantalla.</p>
          </form>
          <form className="qr-config-count" onSubmit={applyCount} noValidate>
            <label htmlFor="qr-table-count">Cantidad de mesas</label>
            <p id="qr-count-help">Numeración consecutiva del 1 al {MAX_TABLE_COUNT}, sin guardar en un servidor.</p>
            <div className="qr-field-action">
              <input
                id="qr-table-count"
                type="number"
                min={1}
                max={MAX_TABLE_COUNT}
                step={1}
                value={countInput}
                aria-describedby={`qr-count-help${countError ? " qr-count-error" : ""}`}
                aria-invalid={Boolean(countError)}
                onChange={(event) => { setCountInput(event.target.value); setCountError(""); }}
              />
              <button type="submit" className="qr-action">Actualizar mesas</button>
            </div>
            {countError && <p id="qr-count-error" className="qr-error" role="alert">{countError}</p>}
            <p className="qr-config-note">La cantidad vuelve a {DEFAULT_TABLE_COUNT} al recargar o salir del panel.</p>
          </form>
        </div>

        <div className="qr-admin-notice qr-screen-only">
          {!siteUrl ? (
            <p><strong>Configura el dominio antes de imprimir.</strong> No se generan QR que apunten a localhost, IPs ni direcciones de prueba.</p>
          ) : hasPendingSite ? (
            <p><strong>Hay una dirección pendiente.</strong> Aplica un dominio válido para volver a generar e imprimir los códigos.</p>
          ) : (
            <p>Destino: <strong>{siteUrl}/menu?mesa=…</strong>. Abre un enlace y escanea una tarjeta con el móvil antes de imprimir todas.</p>
          )}
          <p>Este panel no se publica en producción. Para administrarlo online se necesita protección real del servidor o del proveedor de alojamiento.</p>
        </div>
        <p className="qr-admin-status qr-screen-only" role="status">{status}</p>
        <p className="qr-print-warning">No hay códigos listos para imprimir. Configura y aplica un dominio público HTTPS válido.</p>

        <div className="qr-sheet" aria-label="Tarjetas QR de las mesas">
          {mesas.map((mesa) => {
            const url = ready ? buildTableMenuUrl(siteUrl, mesa) : "";
            return (
              <article key={mesa} className="qr-table" data-mesa={mesa} aria-labelledby={`qr-mesa-${mesa}`}>
                <div className="qr-card-brand">NOVA<span>.</span><small>CUCINA ITALIANA</small></div>
                <h2 id={`qr-mesa-${mesa}`}>Mesa <strong>{mesa}</strong></h2>
                <QRGenerator mesa={mesa} siteUrl={ready ? siteUrl : ""} />
                <p className="qr-card-prompt">Escanea y descubre nuestra carta.</p>
                <p className="qr-card-domain">{ready ? hostname : "Aplica la dirección pública"}</p>
                <div className="qr-card-actions qr-screen-only">
                  <button type="button" className="qr-action" disabled={!ready} onClick={() => printCards(mesa)} aria-label={`Imprimir QR de la mesa ${mesa}`}><FiPrinter aria-hidden="true" /> Imprimir mesa {mesa}</button>
                  {url && <a href={url} target="_blank" rel="noopener noreferrer" className="qr-card-link" aria-label={`Abrir carta de la mesa ${mesa}`}>Comprobar enlace <FiArrowUpRight aria-hidden="true" /></a>}
                </div>
              </article>
            );
          })}
        </div>
        <p className="qr-admin-footer qr-screen-only">Imprime en blanco y negro, sin reducir el tamaño de los códigos y con los encabezados y pies del navegador desactivados. Comprueba el escaneo antes de colocarlos en las mesas.</p>
      </main>
    </div>
  );
};

export default MesasQR;
