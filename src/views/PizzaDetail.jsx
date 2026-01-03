import { useParams, Link } from "react-router-dom";
import { pizzas } from "../data";
import { motion } from "framer-motion";
import { pageFadeUp } from "../animations/pageVariants";

const PizzaDetail = () => {
  const { slug } = useParams();
  const pizza = pizzas.find((p) => p.slug === slug);

  if (!pizza) {
    return (
      <div className="py-32 text-center">
        <p className="text-muted">Pizza no encontrada</p>
        <Link to="/" className="text-accent underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <motion.section
      variants={pageFadeUp}
      initial="hidden"
      animate="visible"
      className="
        min-h-[calc(100vh-72px)]
        flex items-center
        py-16
      "
    >
      <div className="container mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Imagen */}
          <div className="rounded-3xl overflow-hidden shadow-soft">
            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full  object-cover"
            />
          </div>

          {/* Contenido */}
          <div className="space-y-6">
            <Link
              to="/"
              className="text-sm text-muted hover:text-accent transition"
            >
              ← Volver al menú
            </Link>

            <h1 className="font-serif text-4xl md:text-5xl">
              {pizza.name}
            </h1>

            <p className="text-muted text-lg leading-relaxed">
              {pizza.longDescription}
            </p>

            <div>
              <h3 className="font-semibold mb-2">Ingredientes</h3>
              <ul className="grid grid-cols-2 gap-2 text-sm text-muted">
                {pizza.ingredients.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-white/10">
              <span className="text-2xl font-bold text-accent">
                {pizza.price}
              </span>

              <button className="bg-accent hover:bg-accentDark px-6 py-3 rounded-lg transition">
                Ordenar ahora
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default PizzaDetail;
