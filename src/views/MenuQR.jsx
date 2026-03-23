import { useSearchParams } from "react-router-dom";
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
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
      {/* Mesa flotante */}
      {mesa && (
        <div className="fixed top-20 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold">
          🍕 Mesa {mesa}
        </div>
      )}

      {/* HEADER */}
      <div className="max-w-3xl mx-auto px-6 mb-10 text-center">
        <div className="inline-block px-4 py-1 mb-4 rounded-full bg-red-500/10 text-red-400 text-sm">
          Menú Digital
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-red-500 mb-4">
          🍕 Nuestro Menú
        </h1>

        <p className="text-zinc-400 text-lg">
          Pizzas artesanales con ingredientes frescos y masa de fermentación
          lenta.
        </p>

        {mesa && (
          <p className="mt-3 text-sm text-zinc-500">
            Mesa <span className="text-red-400 font-semibold">{mesa}</span>
          </p>
        )}
      </div>

      {/* TABS */}
      <div className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur border-b border-zinc-800 shadow-md shadow-black/20">
        <div className="max-w-6xl mx-auto px-4">
          <div
            ref={tabsRef}
            className="flex gap-2 overflow-x-auto no-scrollbar py-5"
          >
            {MENU_CATEGORIES.map((cat, i) => {
              const isActive = category === cat.key;

              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key, i)}
                  className={`
        relative whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium
        flex items-center gap-2 transition-all duration-300
        ${
          isActive
            ? "bg-red-500 text-white scale-105"
            : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
        }
      `}
                >
                  {icons[cat.key] && <span>{icons[cat.key]}</span>}
                  {cat.label}

                  <span
                    className={`
          absolute bottom-0 left-1/2 -translate-x-1/2
          h-[2px] bg-red-400 transition-all duration-300
          ${isActive ? "w-1/2" : "w-0"}
        `}
                  />
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
      <div className="max-w-4xl mx-auto px-6 mt-20 mb-10">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2
            bg-green-600 hover:bg-green-700
            text-white font-semibold
            py-4 rounded-xl shadow-xl
            transition-colors duration-300
          "
        >
          📲 Pedir por WhatsApp
        </a>
      </div>

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
