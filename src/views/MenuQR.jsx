import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiSearch, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import MenuSection from "../sections/MenuSection";
import { CATEGORY_META, menuSections, MENU_CATEGORIES } from "../data";
import PizzaDetailModal from "../components/PizzaDetailModal";
import Brand from "../components/Brand";
import HeaderBar from "../components/HeaderBar";
import "../styles/menu.css";

const icons = {
  pizzas: "🍕", pastas: "🍝", postres: "🍰", bebidas: "🥤",
  antipasti: "🧀", risottos: "🍚", adicionales: "＋", bambini: "🍽️",
};
const preferences = [
  { key: "all", label: "Todos" },
  { key: "vegan", label: "Veganos", icon: "🌿" },
  { key: "spicy", label: "Picantes", icon: "🌶️" },
];
const allItems = Object.values(menuSections).flatMap((section) => section.items || []);
const EMPTY_ITEMS = [];
const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const scrollBehavior = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";

const MenuQR = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [preference, setPreference] = useState("all");
  const [scrollEdges, setScrollEdges] = useState({ left: false, right: false });
  const tabsRef = useRef(null);
  const tabsBarRef = useRef(null);
  const tabRefs = useRef({});
  const contentRef = useRef(null);
  const pendingCategoryScroll = useRef(false);

  const mesa = searchParams.get("mesa");
  const productId = searchParams.get("product");
  const requestedCategory = searchParams.get("category");
  const category = MENU_CATEGORIES.some((item) => item.key === requestedCategory) ? requestedCategory : "pizzas";
  const currentCategory = MENU_CATEGORIES.find((item) => item.key === category);
  const categoryItems = menuSections[category]?.items || EMPTY_ITEMS;
  const productFromUrl = allItems.find((product) => String(product.id) === productId) || null;
  const activeFilters = Boolean(query.trim()) || preference !== "all";

  const filteredItems = useMemo(() => {
    const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
    return categoryItems.filter((product) => {
      const text = normalize([product.name, product.description, ...(product.ingredients || [])].join(" "));
      return words.every((word) => text.includes(word)) && (preference === "all" || Boolean(product[preference]));
    });
  }, [categoryItems, query, preference]);

  useEffect(() => {
    const scroller = tabsRef.current;
    const updateEdges = () => {
      const left = scroller.scrollLeft > 2;
      const right = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 2;
      setScrollEdges((previous) => previous.left === left && previous.right === right ? previous : { left, right });
    };
    const observer = new ResizeObserver(updateEdges);
    observer.observe(scroller);
    observer.observe(scroller.firstElementChild);
    const frame = requestAnimationFrame(updateEdges);
    scroller.addEventListener("scroll", updateEdges, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      scroller.removeEventListener("scroll", updateEdges);
    };
  }, []);

  useLayoutEffect(() => {
    const shouldScrollContent = pendingCategoryScroll.current;
    pendingCategoryScroll.current = false;
    const frame = requestAnimationFrame(() => {
      const scroller = tabsRef.current;
      const tab = tabRefs.current[category];
      if (scroller && tab) {
        // Move only the horizontal rail; scrollIntoView also moves the page.
        const left = scroller.scrollLeft + tab.getBoundingClientRect().left - scroller.getBoundingClientRect().left;
        scroller.scrollTo({ left: left - (scroller.clientWidth - tab.offsetWidth) / 2, behavior: scrollBehavior() });
      }
      if (shouldScrollContent && contentRef.current) {
        const top = window.scrollY + contentRef.current.getBoundingClientRect().top - tabsBarRef.current.offsetHeight - 20;
        window.scrollTo({ top: Math.max(0, top), behavior: scrollBehavior() });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [category]);

  const handleCategoryChange = (nextCategory, keyboard = false) => {
    if (nextCategory === category) return;
    pendingCategoryScroll.current = true;
    setSearchParams((previous) => {
      const params = new URLSearchParams(previous);
      params.set("category", nextCategory);
      params.delete("product");
      return params;
    }, { replace: keyboard });
  };

  const handleTabKeyDown = (event, index) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % MENU_CATEGORIES.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + MENU_CATEGORIES.length) % MENU_CATEGORIES.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = MENU_CATEGORIES.length - 1;
    else return;
    event.preventDefault();
    const nextCategory = MENU_CATEGORIES[nextIndex].key;
    tabRefs.current[nextCategory]?.focus({ preventScroll: true });
    handleCategoryChange(nextCategory, true);
  };

  const handleSelectItem = (product) => {
    setSearchParams((previous) => {
      const params = new URLSearchParams(previous);
      params.set("product", String(product.id));
      return params;
    });
  };

  const handleCloseModal = () => {
    setSearchParams((previous) => {
      const params = new URLSearchParams(previous);
      params.delete("product");
      return params;
    }, { replace: true });
  };

  const clearFilters = () => {
    setQuery("");
    setPreference("all");
  };
  const shiftTabs = (direction) => tabsRef.current.scrollBy({ left: direction * tabsRef.current.clientWidth * 0.7, behavior: scrollBehavior() });

  return (
    <div className="digital-menu">
      <a href="#menu-content" className="skip-link">Saltar a los platos</a>
      <HeaderBar className="menu-topbar">
        <Brand label="Pizzería Nova, volver a la web" />
        <Link to="/" className="site-header-link">Volver a la web <FiArrowUpRight aria-hidden="true" /></Link>
      </HeaderBar>

      <section className="menu-hero menu-container" aria-labelledby="menu-title">
        <div className="menu-hero-copy">
          <div className="menu-eyebrow-row">
            <span className="menu-eyebrow"><span aria-hidden="true" /> NUESTRA CARTA</span>
            {mesa && <span className="menu-table-badge">Mesa <strong>{mesa}</strong></span>}
          </div>
          <h1 id="menu-title" className="menu-display">A tu mesa,<br />un poco de <em>Italia.</em></h1>
          <p className="menu-intro">Pizzas de fermentación lenta, pastas y sabores para compartir. Elige tu favorito y disfruta a tu manera.</p>
          <p className="menu-photo-note">Algunas fotos son ilustrativas de preparaciones relacionadas. Consulta la descripción e ingredientes de cada plato. <a href="/menu/credits.html" target="_blank" rel="noopener noreferrer">Créditos de imágenes</a></p>
          <div className="menu-hero-meta"><span>{MENU_CATEGORIES.length} categorías</span><span aria-hidden="true">·</span><span>{allItems.length} opciones para disfrutar</span></div>
        </div>
        <div className="menu-hero-art" aria-hidden="true">
          <span className="menu-art-note">Fatto con amore</span>
          <svg viewBox="0 0 320 280" className="menu-pizza-art" fill="none">
            <ellipse cx="160" cy="236" rx="115" ry="16" fill="#000" opacity=".2" />
            <circle cx="160" cy="139" r="117" stroke="#b8a99a" strokeOpacity=".2" />
            <circle cx="160" cy="139" r="105" fill="#e9c58e" />
            <circle cx="160" cy="139" r="92" fill="#b74630" />
            <circle cx="160" cy="139" r="85" fill="#edba71" />
            <path d="m160 54 0 170M86 97l148 85M86 182l148-85" stroke="#d79a56" strokeWidth="2" />
            {[[125, 98], [194, 103], [153, 155], [107, 167], [198, 173]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="17" fill="#bb4c36" />)}
            <path d="M151 90q-28-32-35-5 6 24 35 5Zm42 57q30-32 35-5-6 24-35 5Zm-58 43q-30-20-31 4 12 18 31-4Z" fill="#526442" />
            <circle cx="169" cy="107" r="7" fill="#f6dfb6" /><circle cx="182" cy="197" r="8" fill="#f6dfb6" /><circle cx="104" cy="133" r="6" fill="#f6dfb6" />
          </svg>
          <span className="menu-art-caption">Buenos ingredientes. Buenos momentos.</span>
        </div>
      </section>

      <div className="menu-tabs-bar" ref={tabsBarRef}>
        <div className="menu-container menu-tabs-layout">
          <div ref={tabsRef} className="menu-tabs-scroller no-scrollbar">
            <div role="tablist" aria-label="Categorías del menú" aria-orientation="horizontal" className="menu-tabs">
              {MENU_CATEGORIES.map((item, index) => (
                <button
                  key={item.key}
                  ref={(element) => { tabRefs.current[item.key] = element; }}
                  id={`menu-tab-${item.key}`}
                  type="button"
                  role="tab"
                  aria-selected={category === item.key}
                  aria-controls="menu-panel"
                  tabIndex={category === item.key ? 0 : -1}
                  onClick={() => handleCategoryChange(item.key)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`menu-tab ${category === item.key ? "is-active" : ""}`}
                >
                  <span className="menu-tab-icon" aria-hidden="true">{icons[item.key]}</span>
                  <span>{item.label}</span>
                  <span className="menu-tab-count" aria-hidden="true">{menuSections[item.key]?.items.length || 0}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="menu-tabs-arrows">
            <button type="button" onClick={() => shiftTabs(-1)} disabled={!scrollEdges.left} aria-label="Desplazar categorías a la izquierda"><FiChevronLeft aria-hidden="true" /></button>
            <button type="button" onClick={() => shiftTabs(1)} disabled={!scrollEdges.right} aria-label="Desplazar categorías a la derecha"><FiChevronRight aria-hidden="true" /></button>
          </div>
        </div>
      </div>

      <div className="menu-container menu-content" id="menu-content" ref={contentRef} tabIndex={-1}>
        <section id="menu-panel" role="tabpanel" aria-labelledby={`menu-tab-${category}`} tabIndex={0}>
          <header className="menu-category-header">
            <div>
              <p className="menu-section-kicker">ENCUENTRA TU FAVORITO</p>
              <h2 className="menu-category-title">{currentCategory.label}<span>{categoryItems.length}</span></h2>
              <p className="menu-category-description">{CATEGORY_META[category]?.description}</p>
            </div>
            <div className="menu-search">
              <FiSearch aria-hidden="true" />
              <label className="sr-only" htmlFor="menu-search">Buscar en {currentCategory.label}</label>
              <input id="menu-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Buscar en ${currentCategory.label.toLowerCase()}…`} />
              {query && <button type="button" onClick={() => setQuery("")} aria-label="Limpiar búsqueda"><FiX aria-hidden="true" /></button>}
            </div>
          </header>

          <div className="menu-filter-row">
            <div className="menu-filters" role="group" aria-label="Preferencias de platos">
              {preferences.map((filter) => <button type="button" key={filter.key} aria-pressed={preference === filter.key} className={preference === filter.key ? "is-active" : ""} onClick={() => setPreference(filter.key)}>{filter.icon && <span aria-hidden="true">{filter.icon}</span>}{filter.label}</button>)}
            </div>
            <p className="menu-results" role="status">{filteredItems.length} {filteredItems.length === 1 ? "opción" : "opciones"}{activeFilters ? " encontradas" : " en la carta"}</p>
          </div>

          {productId && !productFromUrl && <div className="menu-product-notice" role="status">Este producto no está disponible. Puedes seguir explorando la carta.<button type="button" onClick={handleCloseModal} aria-label="Cerrar aviso de producto"><FiX aria-hidden="true" /></button></div>}

          {filteredItems.length ? (
            <MenuSection type={category} mesa={mesa} items={filteredItems} onSelectItem={handleSelectItem} hideHeader />
          ) : (
            <div className="menu-empty">
              <FiSearch aria-hidden="true" />
              <h3>No encontramos esa combinación</h3>
              <p>Prueba con otro nombre o ingrediente, o elimina los filtros de esta categoría.</p>
              <button type="button" onClick={clearFilters}>Ver toda la categoría</button>
            </div>
          )}
        </section>
        <footer className="menu-footer"><span>NOVA<span className="text-red-500">.</span> <span className="menu-footer-tagline">Un poco de Italia, cerca de ti.</span></span><div className="menu-footer-links"><a href="/menu/credits.html" target="_blank" rel="noopener noreferrer">Créditos de imágenes</a><Link to="/">Conoce nuestra pizzería <FiArrowUpRight aria-hidden="true" /></Link></div></footer>
      </div>
      <PizzaDetailModal pizza={productFromUrl} mesa={mesa} onClose={handleCloseModal} />
    </div>
  );
};

export default MenuQR;
