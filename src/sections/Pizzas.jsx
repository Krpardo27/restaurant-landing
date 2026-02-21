import { Link } from "react-router-dom";
import { pizzas } from "../data.js";
import { cldCard, cldCardSrcSet } from "../utils/cloudinary.js";

const PHONE = "56912345678";

const Pizzas = () => {
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
            const wa = `https://wa.me/${PHONE}?text=Hola,%20quiero%20la%20pizza%20${pizza.name}`;

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
300px
"
                    alt={`Pizza artesanal ${pizza.name}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
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
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">{pizza.name}</h3>

                  <p className="text-zinc-400 text-sm">{pizza.description}</p>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-red-500 font-bold text-lg">
                      {pizza.price}
                    </span>

                    <div className="flex gap-2">
                      <Link
                        to={`/pizza/${pizza.slug}`}
                        className="
                          text-xs px-3 py-2 rounded-lg
                          border border-white/10
                          hover:border-red-500 hover:text-red-500
                          transition
                        "
                      >
                        Ver
                      </Link>

                      <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          bg-green-500 hover:bg-green-600
                          text-white text-xs px-3 py-2 rounded-lg
                          transition shadow
                        "
                      >
                        Pedir
                      </a>
                    </div>
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
