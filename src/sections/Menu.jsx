import { Link } from "react-router-dom";
import { pizzas } from "../data";
import { motion } from "framer-motion";

/* Animaciones */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
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
    <section id="menu" className="lg:py-28 py-12 bg-[#121212]">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <header className="mb-20">
          <h2 className="font-serif text-3xl md:text-5xl text-accent mb-4">
            Nuestro menú
          </h2>
          <p className="text-muted text-lg max-w-2xl">
            Pizzas artesanales elaboradas con masa de fermentación lenta,
            ingredientes frescos y recetas pensadas para disfrutar sin prisa.
          </p>
        </header>

        {/* Categorías */}
        {categories.map((category) => {
          const items = pizzas.filter(
            (pizza) => pizza.category === category.key
          );

          if (!items.length) return null;

          return (
            <div key={category.key} className="mb-24">
              {/* Título categoría */}
              <h3 className="font-serif text-2xl text-white mb-12">
                {category.label}
              </h3>

              {/* Lista estilo carta */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-10"
              >
                {items.map((pizza) => (
                  <motion.div key={pizza.id} variants={item} className="group">
                    {/* Nombre + línea + precio */}
                    <div className="flex items-baseline gap-4">
                      {/* Nombre + iconos */}
                      <h4 className="text-lg font-medium flex-shrink-0 text-accent">
                        {pizza.name}
                        {pizza.spicy && (
                          <span
                            className="ml-2 text-sm text-accent"
                            title="Picante"
                          >
                            🌶️
                          </span>
                        )}
                        {pizza.vegan && (
                          <span className="ml-2 text-sm" title="Vegana">
                            🌱
                          </span>
                        )}
                      </h4>

                      {/* Línea punteada */}
                      <span className="flex-1 border-b border-dotted border-white/30 translate-y-[-4px]" />

                      {/* Precio */}
                      <span className="text-accent font-semibold">
                        {pizza.price}
                      </span>
                    </div>

                    {/* Descripción */}
                    <p className="text-muted text-sm max-w-xl mt-2">
                      {pizza.description}
                    </p>

                    {pizza.ingredients && (
                      <p className="text-neutral-500 text-xs mt-1 italic">
                        {formatIngredients(pizza.ingredients)}
                      </p>
                    )}

                    <Link
                      to={`/pizza/${pizza.slug}`}
                      className="
                        inline-block mt-2
                        text-sm text-neutral-400
                        hover:text-accent
                        transition
                      "
                    >
                      Ver detalle →
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Menu;
