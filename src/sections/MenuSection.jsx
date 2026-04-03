import { AnimatePresence, motion } from "framer-motion";
import {
  pizzas,
  antipasti,
  pastas,
  risottos,
  postres,
  bebidas,
  adicionales,
  bambini,
  CATEGORY_META,
} from "../data";
import { cldCard, cldCardSrcSet } from "../utils/cloudinary";

const PHONE = "56912345678";

/* Animaciones */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

const MenuSection = ({ type, mesa, onSelectItem, hideHeader = false }) => {
  const getItems = () => {
    switch (type) {
      case "pizzas":
        return pizzas;
      case "antipasti":
        return antipasti;
      case "pastas":
        return pastas;
      case "risottos":
        return risottos;
      case "postres":
        return postres;
      case "bebidas":
        return bebidas;
      case "adicionales":
        return adicionales;
      case "bambini":
        return bambini;
      default:
        return [];
    }
  };

  const items = getItems();

  const titles = {
    pizzas: "Pizzas 🍕",
    antipasti: "Antipasti 🧀",
    pastas: "Pastas 🍝",
    risottos: "Risottos 🍚",
    postres: "Postres 🍰",
    bebidas: "Bebidas 🥤",
    adicionales: "Adicionales ➕",
    bambini: "Peri Bambini 👶",
  };

  if (!items.length) return null;

  const currentCategory = CATEGORY_META[type] || {
    title: titles[type],
    description: "Descubre nuestra selección",
  };

  // Badge configurable
  const getBadgeStyles = (type) => {
    const badges = {
      popular: {
        icon: "⭐",
        label: "Popular",
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
      },
      vegan: {
        icon: "🌱",
        label: "Vegano",
        bg: "bg-green-500/20",
        text: "text-green-400",
      },
      spicy: {
        icon: "🌶️",
        label: "Picante",
        bg: "bg-red-500/20",
        text: "text-red-400",
      },
    };
    return badges[type] || null;
  };

  return (
    <section
      className={`bg-black text-white ${hideHeader ? "py-6" : "lg:py-20"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        {!hideHeader && (
          <header className="max-w-2xl py-8 sm:py-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-red-500 mb-3 tracking-tight">
              {currentCategory.title}
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg border-l-4 border-red-500 pl-4">
              {currentCategory.description}
            </p>
          </header>
        )}

        {/* LISTA */}
        <AnimatePresence>
          <motion.div
            key={type}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-4 sm:space-y-5"
          >
            {items.map((product) => {
              const message = mesa
                ? `Hola, estoy en la mesa ${mesa} y quiero ${product.name}`
                : `Hola, quiero ${product.name}`;

              const wa = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

              return (
                <motion.div
                  key={product.id}
                  variants={item}
                  className="
                  group
                  relative
                  bg-zinc-900/90
                  backdrop-blur-sm
                  rounded-2xl
                  border border-zinc-800
                  hover:border-zinc-700
                  transition-all
                  duration-200
                  overflow-hidden
                "
                >
                  <div className="p-4 sm:p-5">
                    {/* Primera fila: Imagen + info principal */}
                    <div className="flex gap-4">
                      {product.image && (
                        <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-800 shadow-md">
                          <img
                            src={cldCard(product.image, 320)}
                            srcSet={cldCardSrcSet(product.image)}
                            sizes="(max-width: 640px) 112px, 128px"
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">
                            {product.name}
                          </h3>

                          <span className="bg-red-500/10 text-red-400 font-bold text-lg sm:text-xl px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                            {product.price}
                          </span>
                        </div>

                        {/*  INGREDIENTES (AHORA PRIORIDAD) */}
                        {product.ingredients && (
                          <p className="text-zinc-200 text-sm mt-1.5 line-clamp-2">
                            {product.ingredients.join(" · ")}
                          </p>
                        )}

                        {/*  DESCRIPCIÓN (AHORA SECUNDARIA) */}
                        <p className="text-zinc-400 text-xs sm:text-sm mt-1 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-zinc-800/50">
                      <div className="flex flex-wrap gap-2">
                        {product.popular &&
                          (() => {
                            const style = getBadgeStyles("popular");
                            return (
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 ${style.bg} ${style.text} text-xs sm:text-sm rounded-lg`}
                              >
                                <span>{style.icon}</span>
                                <span className="hidden sm:inline">
                                  {style.label}
                                </span>
                              </span>
                            );
                          })()}

                        {product.vegan &&
                          (() => {
                            const style = getBadgeStyles("vegan");
                            return (
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 ${style.bg} ${style.text} text-xs sm:text-sm rounded-lg`}
                              >
                                <span>{style.icon}</span>
                                <span className="hidden sm:inline">
                                  {style.label}
                                </span>
                              </span>
                            );
                          })()}

                        {product.spicy &&
                          (() => {
                            const style = getBadgeStyles("spicy");
                            return (
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 ${style.bg} ${style.text} text-xs sm:text-sm rounded-lg`}
                              >
                                <span>{style.icon}</span>
                                <span className="hidden sm:inline">
                                  {style.label}
                                </span>
                              </span>
                            );
                          })()}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onSelectItem(product)}
                          className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-medium rounded-xl border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all active:scale-95"
                        >
                          Ver detalle
                        </button>

                        <button
                          onClick={() => window.open(wa, "_blank")}
                          className="px-5 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-semibold rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-1"
                        >
                          <span>📱</span>
                          <span>Pedir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuSection;
