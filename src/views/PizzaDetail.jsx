import { useParams, Link } from "react-router-dom";
import { pizzas } from "../data";
import { motion } from "framer-motion";
import { pageFadeUp } from "../animations/pageVariants";
import { cldDetail, cldDetailSrcSet } from "../utils/cloudinary";

const PHONE = "56912345678"; 

const PizzaDetail = () => {
  const { slug } = useParams();
  const pizza = pizzas.find((p) => p.slug === slug);

  if (!pizza) {
    return (
      <div className="py-32 text-center">
        <p className="text-zinc-400">Pizza no encontrada</p>
        <Link to="/" className="text-red-500 underline">
          Volver al menú
        </Link>
      </div>
    );
  }

  const waLink = `https://wa.me/${PHONE}?text=Hola,%20quiero%20la%20pizza%20${pizza.name}`;

  return (
    <section className="min-h-[calc(100vh-72px)] py-16 bg-zinc-950 text-white">
      <motion.div
        variants={pageFadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center my-20"
      >
        {/* Imagen */}
        <div className="relative group">
          <img
  src={cldDetail(pizza.image, 1200)}
  srcSet={cldDetailSrcSet(pizza.image)}
  sizes="(max-width:1024px) 95vw, 50vw"
  alt={`Pizza artesanal ${pizza.name}`}
  loading="eager"
  decoding="async"
  className="w-full h-[420px] object-cover rounded-3xl shadow-xl"
/>

          {/* Badge artesanal */}
          <span className="absolute top-4 left-4 bg-red-600 text-sm px-3 py-1 rounded-full shadow">
            🍕 Artesanal
          </span>
        </div>

        {/* Contenido */}
        <div className="space-y-6">
          <Link
            to="/"
            className="text-sm text-zinc-400 hover:text-red-500 transition"
          >
            ← Volver al menú
          </Link>

          <div>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight">
              {pizza.name}
            </h1>
            <p className="text-red-500 mt-1 italic">
              Pizzería y sabores de Italia 🇮🇹
            </p>
          </div>

          <p className="text-zinc-300 text-lg leading-relaxed">
            {pizza.longDescription}
          </p>

          {/* Ingredientes */}
          <div>
            <h3 className="font-semibold mb-2 text-red-500">
              Ingredientes frescos
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-zinc-400">
              {pizza.ingredients.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* Precio + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-6 border-t border-zinc-700">
            <span className="text-3xl font-bold text-red-500">
              {pizza.price}
            </span>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                bg-green-500 hover:bg-green-600
                px-6 py-3 rounded-xl
                font-semibold shadow-lg
                transition flex items-center justify-center gap-2
              "
            >
              📲 Pedir por WhatsApp
            </a>
          </div>

          {/* Info extra */}
          <div className="text-sm text-zinc-400 pt-4">
            ⏱️ Preparación artesanal · 20-30 min 📍 Retiro en local o despacho
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PizzaDetail;
