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
} from "../data";

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

  return (
    <section
      className={`bg-zinc-950 text-white ${
        hideHeader ? "py-10" : "lg:py-28 py-14"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        {!hideHeader && (
          <header className="mb-20 max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl text-red-500 mb-3">
              {titles[type]}
            </h2>

            <p className="text-zinc-400 text-lg">
              Descubre nuestra selección artesanal
            </p>
          </header>
        )}

        {/* LISTA */}
        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            variants={container}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {items.map((product) => {
              const message = mesa
                ? `Hola, estoy en la mesa ${mesa} y quiero ${product.name}`
                : `Hola, quiero ${product.name}`;

              const wa = `https://wa.me/${PHONE}?text=${encodeURIComponent(
                message,
              )}`;

              return (
                <motion.div
                  key={product.id}
                  variants={item}
                  className="group flex gap-4 items-start border-b border-white/5 pb-6"
                >
                  {/* IMG */}
                  {product.image && (
                    <img
                      src={product.image}
                      className="w-20 h-20 object-cover rounded-xl"
                      alt={product.name}
                    />
                  )}

                  <div className="flex-1">
                    {/* TITLE */}
                    <div className="flex items-baseline gap-4">
                      <h4 className="text-lg font-semibold text-red-500">
                        {product.name}
                        {product.popular && <span className="ml-2">⭐</span>}
                        {product.spicy && <span className="ml-2">🌶️</span>}
                        {product.vegan && <span className="ml-2">🌱</span>}
                      </h4>

                      <span className="flex-1 border-b border-dotted border-white/20" />

                      <span className="text-red-500 font-bold">
                        {product.price}
                      </span>
                    </div>

                    {/* DESC */}
                    <p className="text-zinc-400 text-sm mt-1">
                      {product.description}
                    </p>

                    {/* INGREDIENTES */}
                    {product.ingredients && (
                      <p className="text-zinc-500 text-xs italic">
                        {product.ingredients.join(" · ")}
                      </p>
                    )}

                    {/* ACTIONS */}
                    <div className="flex gap-4 mt-3">
                      <button
                        onClick={() => onSelectItem(product)}
                        className="text-xs text-zinc-400 hover:text-red-500"
                      >
                        Ver detalle →
                      </button>

                      <button
                        onClick={() => window.open(wa, "_blank")}
                        className="text-xs text-green-400 hover:text-green-300"
                      >
                        Pedir por WhatsApp
                      </button>
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
