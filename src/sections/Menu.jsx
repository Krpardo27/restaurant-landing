import { Link } from "react-router-dom";
import { pizzas } from "../data";
import { motion } from "framer-motion";
import { cldThumb, cldThumbSrcSet } from "../utils/cloudinary";

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
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const categories = [
  { key: "clasicas", label: "Clásicas" },
  { key: "especiales", label: "Especiales" },
  { key: "veganas", label: "Veganas" },
];

const formatIngredients = (ingredients, limit = 3) => {
  if (!ingredients?.length) return null;
  return ingredients.slice(0, limit).join(" · ") + "…";
};

const Menu = () => {
  return (
    <section id="menu" className="lg:py-28 py-14 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <header className="mb-20 max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl text-red-500 mb-3">
            Nuestro menú 🍕
          </h2>
          <p className="text-zinc-400 text-lg">
            Pizzas artesanales con masa de fermentación lenta, ingredientes
            frescos y recetas tradicionales.
            <span className="block italic text-red-500 mt-1">
              Pizzería y sabores de Italia 🇮🇹
            </span>
          </p>
        </header>

        {/* CATEGORÍAS */}
        {categories.map((category) => {
          const items = pizzas.filter(
            (pizza) => pizza.category === category.key,
          );

          if (!items.length) return null;

          return (
            <div key={category.key} className="mb-24">
              {/* TÍTULO */}
              <h3 className="font-serif text-2xl text-white mb-10">
                {category.label}
              </h3>

              {/* LISTA */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {items.map((pizza) => {
                  const wa = `https://wa.me/${PHONE}?text=Hola,%20quiero%20la%20pizza%20${pizza.name}`;

                  return (
                    <motion.div
                      key={pizza.id}
                      variants={item}
                      className="
                        group flex gap-4 items-start
                        border-b border-white/5 pb-6
                      "
                    >
                      {/* FOTO MINI */}
                      <img
                        src={cldThumb(pizza.image, 160)}
                        srcSet={cldThumbSrcSet(pizza.image)}
                        sizes="80px"
                        width="80"
                        height="80"
                        alt={`Pizza artesanal ${pizza.name}`}
                        loading="lazy"
                        decoding="async"
                        className="
    w-20 h-20 object-cover rounded-xl
    shadow-md flex-shrink-0
    group-hover:scale-105 transition
  "
                      />
                      <div className="flex-1">
                        {/* Nombre + línea + precio */}
                        <div className="flex items-baseline gap-4">
                          <h4 className="text-lg font-semibold text-red-500">
                            {pizza.name}

                            {pizza.popular && (
                              <span className="ml-2 text-xs text-yellow-400">
                                ⭐
                              </span>
                            )}

                            {pizza.spicy && (
                              <span className="ml-2 text-xs">🌶️</span>
                            )}

                            {pizza.vegan && (
                              <span className="ml-2 text-xs">🌱</span>
                            )}
                          </h4>

                          <span className="flex-1 border-b border-dotted border-white/20 translate-y-[-4px]" />

                          <span className="text-red-500 font-bold">
                            {pizza.price}
                          </span>
                        </div>

                        {/* Descripción */}
                        <p className="text-zinc-400 text-sm mt-1 max-w-xl">
                          {pizza.description}
                        </p>

                        {/* Ingredientes */}
                        {pizza.ingredients && (
                          <p className="text-zinc-500 text-xs mt-1 italic">
                            {formatIngredients(pizza.ingredients)}
                          </p>
                        )}

                        {/* BOTONES */}
                        <div className="flex gap-4 mt-3">
                          <Link
                            to={`/pizza/${pizza.slug}`}
                            className="
                              text-xs text-zinc-400
                              hover:text-red-500 transition
                            "
                          >
                            Ver detalle →
                          </Link>

                          <a
                            href={wa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              bg-green-700 hover:bg-green-800
    text-white font-semibold
    px-6 py-3 rounded-xl
    shadow-lg transition
                            "
                          >
                            📲 Pedir
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Menu;
