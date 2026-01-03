import { Link } from "react-router-dom";
import { pizzas } from "../data.js";

const Pizzas = () => {
  return (
    <section id="menu" className="py-24 container mx-auto px-6">
      <div className="container">
        {/* Header */}
        <header className="max-w-2xl mb-16">
          <h2
            className="
            font-serif
            text-3xl md:text-5xl
            mb-4
          "
          >
            Nuestras Pizzas
          </h2>

          <p className="text-muted text-lg leading-relaxed">
            Cada pizza es preparada con masa de fermentación lenta, ingredientes
            frescos y recetas inspiradas en la tradición italiana. Un equilibrio
            perfecto entre sabor y textura.
          </p>
        </header>

        {/* Grid */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
        "
        >
          {pizzas.map((pizza) => (
            <article
              key={pizza.id}
              className="
                rounded-2xl
                overflow-hidden
                shadow-soft
                transition
                hover:-translate-y-1
                hover:shadow-glow
                shadow-lg

              "
            >
              {/* Imagen */}

              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="
                    w-full h-full
                    object-cover
                    transition-transform duration-500
                    hover:scale-110
                  "
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">{pizza.name}</h3>

                <p className="text-muted text-sm">{pizza.description}</p>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-accent font-semibold">
                    {pizza.price}
                  </span>

                  <Link
                    to={`/pizza/${pizza.slug}`}
                    className="
    text-sm px-4 py-2 rounded-lg
    border border-white/10
    hover:border-accent hover:text-accent
    transition
  "
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pizzas;
