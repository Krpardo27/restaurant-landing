import { Link, useSearchParams } from "react-router-dom";
import { useMemo, useRef } from "react";

import MenuSection from "../sections/MenuSection";
import { menuSections, MENU_CATEGORIES } from "../data";
import PizzaDetailModal from "../components/PizzaDetailModal";

const PHONE = "56912345678";

const icons = {
  pizzas: "🍕",
  pastas: "🍝",
  postres: "🍰",
  bebidas: "🥤",
  antipasti: "🧀",
  risottos: "🍚",
  adicionales: "➕",
  bambini: "👶",
};

const MenuQR = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mesa = searchParams.get("mesa");
  const productId = searchParams.get("product");
  const category = searchParams.get("category") || "pizzas";

  // 🔥 todos los productos
  const allItems = useMemo(() => {
    return Object.values(menuSections).flatMap(
      (section) => section?.items || [],
    );
  }, []);

  const tabsRef = useRef(null);
  const contentRef = useRef(null);

  // 🔥 producto derivado desde URL (source of truth)
  const productFromUrl = useMemo(() => {
    return allItems.find((p) => p?.id === productId) || null;
  }, [productId, allItems]);

  const message = mesa
    ? `Hola, estoy en la mesa ${mesa} y quiero hacer un pedido`
    : `Hola, quiero hacer un pedido`;

  const waLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  const handleCategoryChange = (newCategory, index) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (mesa) params.set("mesa", mesa);

      params.set("category", newCategory);
      params.delete("product");

      return params;
    });

    // 🔥 scroll tabs horizontal
    const buttons = tabsRef.current?.querySelectorAll("button");
    const el = buttons?.[index];

    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    // 🔥 SCROLL AL CONTENIDO (LA CLAVE)
    setTimeout(() => {
      const tabsHeight = tabsRef.current?.offsetHeight || 0;
      const y =
        contentRef.current.getBoundingClientRect().top +
        window.scrollY -
        tabsHeight -
        8; // pequeño margen

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }, 50);
  };

  // 🔹 seleccionar producto (solo URL)
  const handleSelectItem = (product) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (mesa) params.set("mesa", mesa);
      if (product?.id) params.set("product", product.id);

      return params;
    });
  };

  // 🔹 cerrar modal
  const handleCloseModal = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (mesa) params.set("mesa", mesa);
      params.delete("product");

      return params;
    });
  };

  return (
    <div className="text-white">
      {mesa && (
        <div className="fixed top-20 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold">
          🍕 Mesa {mesa}
        </div>
      )}

      {/* HEADER */}
      <div className="max-w-3xl mx-auto px-6 mb-12 text-center">
        <div className="flex items-center justify-between mb-6 gap-4">
          {/* TAG */}
          <span
            className="
      inline-flex items-center gap-2
      px-5 py-2.5 rounded-full
      bg-red-500/15 text-red-300
      text-xs font-medium
      border border-red-500/20
      whitespace-nowrap
    "
          >
            🍕 Menú Digital
          </span>

          {/* CTA */}
          <Link
            to="/"
            className="
    inline-flex items-center justify-center
    px-5 py-2.5
    rounded-xl

    bg-red-500 hover:bg-red-600
    text-white font-semibold text-sm

    shadow-md hover:shadow-lg
    transition-all duration-200
    active:scale-[0.97]
  "
          >
             Visita nuestra web
          </Link>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
          🍕 Nuestro Menú
        </h1>

        <p className="text-zinc-300 text-lg">
          Pizzas artesanales con ingredientes frescos y masa de fermentación
          lenta.
        </p>

        {mesa && (
          <p className="mt-3 text-sm text-zinc-400">
            Mesa <span className="text-red-400 font-semibold">{mesa}</span>
          </p>
        )}
      </div>

      {/* TABS */}
      <div className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4">
          <div
            ref={tabsRef}
            className="flex gap-3 overflow-x-auto no-scrollbar py-4"
          >
            {MENU_CATEGORIES.map((cat, i) => {
              const isActive = category === cat.key;

              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key, i)}
                  className={`
              whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium
              flex items-center gap-2 transition-all duration-200
              ${
                isActive
                  ? "bg-red-500 text-white shadow-lg scale-105"
                  : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
              }
            `}
                >
                  <span className="text-base">{icons[cat.key]}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div ref={contentRef}>
        {menuSections[category] ? (
          <MenuSection
            key={category}
            type={category}
            mesa={mesa}
            onSelectItem={handleSelectItem}
          />
        ) : (
          <div className="text-center py-20 text-zinc-500">
            No hay contenido disponible
          </div>
        )}
      </div>

      {/* CTA */}
      {/* <div className="max-w-4xl mx-auto px-6 mt-20 mb-10">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
      flex items-center justify-center gap-3
      bg-green-500 hover:bg-green-600
      text-white font-semibold text-lg
      py-4 rounded-2xl shadow-xl
      transition-all duration-200
      active:scale-95
    "
        >
          📲 Pedir por WhatsApp
        </a>
      </div> */}

      {/* MODAL */}
      <PizzaDetailModal
        pizza={productFromUrl}
        mesa={mesa}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MenuQR;
