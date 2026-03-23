import { Link, useNavigate } from "react-router-dom";
import { pizzas } from "../data.js";
import { cldCard, cldCardSrcSet } from "../utils/cloudinary.js";
import { useState } from "react";
import PizzaLoader from "../components/PizzaLoader.jsx";
import { FiEye } from "react-icons/fi";

const PHONE = "56912345678";

const Pizzas = () => {
  const [loadingSlug, setLoadingSlug] = useState(null);
  const navigate = useNavigate();
  

  if (loadingSlug) {
    return <PizzaLoader />;
  }

  const handleClick = (slug) => {
    setLoadingSlug(slug);

    setTimeout(() => {
      navigate(`/pizza/${slug}`);
    }, 600); 
  };

  return (
    <section id="pizzas" className="py-16 lg:py-24 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="max-w-2xl mb-14">
          <h2 className="font-serif text-4xl md:text-5xl mb-3">
            Nuestras Pizzas 🍕
          </h2>

          <p className="text-zinc-400 text-lg">
            Masa de fermentación lenta, ingredientes frescos y recetas
            auténticas de Italia.
            <span className="text-red-500 italic block mt-1">
              Pizzería y sabores de Italia 🇮🇹
            </span>
          </p>
        </header>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pizzas.map((pizza) => {
            const wa = `https://wa.me/${PHONE}?text=${encodeURIComponent(
              `Hola, quiero la pizza ${pizza.name}`,
            )}`;

            return (
              <article
                key={pizza.id}
                className="
                  bg-zinc-900 rounded-3xl overflow-hidden
                  border border-white/5
                  hover:border-red-500/40
                  transition group shadow-lg
                "
              >
                {/* Imagen */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={cldCard(pizza.image, 360)}
                    srcSet={cldCardSrcSet(pizza.image)}
                    sizes="
(max-width:640px) 90vw,
(max-width:1024px) 45vw,
(max-width:1280px) 30vw,
300px
"
                    width="360"
                    height="270"
                    alt={`Pizza artesanal ${pizza.name}`}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 will-change-transform"
                  />

                  {/* Badge */}
                  {pizza.popular && (
                    <span
                      className="
                      absolute top-3 left-3
                      bg-red-600 text-xs px-3 py-1 rounded-full shadow
                    "
                    >
                      ⭐ Más pedida
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex flex-col">
                  <h3 className="text-xl font-semibold">{pizza.name}</h3>

                  <p className="text-zinc-400 text-sm">{pizza.description}</p>

                  {/* precio */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-red-500 font-bold text-xl">
                      {pizza.price}
                    </span>
                  </div>

                  {/* botones */}
                  <div className="flex gap-3 mt-2">
                    <Link
                      to={`/pizza/${pizza.slug}`}
                      onClick={() => handleClick(pizza.slug)}
                      onMouseEnter={() => import("../views/PizzaDetail.jsx")}
                      className="
        flex items-center gap-2
        text-sm font-medium
        px-4 py-2
        rounded-lg
        border border-white/10
        bg-zinc-900
        hover:bg-red-500/10
        hover:border-red-500
        hover:text-red-400
        transition-all duration-300
      "
                    >
                      <FiEye className="text-base" />
                      Ver
                    </Link>

                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
        flex-1 text-center
        bg-green-700 hover:bg-green-800
        text-white font-semibold
        px-4 py-2
        rounded-lg
        shadow-lg
        transition
      "
                    >
                      Pedir
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pizzas;
