import {
  useParams,
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { pizzas } from "../data";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { pageFadeUp } from "../animations/pageVariants";
import { cldDetail, cldDetailSrcSet } from "../utils/cloudinary";

const PHONE = "56912345678";
const DOMAIN = import.meta.env.VITE_SITE_URL;

const PizzaDetail = () => {
  const { slug } = useParams();
  const pizza = pizzas.find((p) => p.slug === slug);

  const navigate = useNavigate();

  const [params] = useSearchParams();

  const mesa = params.get("mesa");

  if (!pizza) {
    return (
      <div className="py-32 text-center bg-zinc-950 text-white min-h-screen">
        <p className="text-zinc-400 mb-4">Pizza no encontrada</p>
        <button onClick={() => navigate(-1)} className="text-red-500 underline">
          Volver al menú
        </button>
      </div>
    );
  }

  // 🔥 mensaje WhatsApp contextual
  const message = mesa
    ? `Hola, estoy en la mesa ${mesa} y quiero la pizza ${pizza.name} 🍕`
    : `Hola, quiero la pizza ${pizza.name} 🍕`;

  const waLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <Helmet>
        <title>{pizza.name} | Pizzería Italiana</title>

        <meta
          name="description"
          content={`Descubre nuestra pizza ${pizza.name}. ${pizza.description}`}
        />

        <meta
          name="keywords"
          content="pizza italiana, pizzería artesanal, pizza napolitana, pizzas a domicilio, pizza chile"
        />

        <meta name="robots" content="index, follow" />

        <meta name="author" content="Pizzería Italiana" />
        <meta name="publisher" content="Pizzería Italiana" />

        <link rel="canonical" href={`${DOMAIN}/pizza/${pizza.slug}`} />

        {/* LCP */}
        <link
          rel="preload"
          as="image"
          href={cldDetail(pizza.image, 1200)}
          imageSrcSet={cldDetailSrcSet(pizza.image)}
          imageSizes="(max-width:1024px) 95vw, 560px"
          fetchPriority="high"
        />

        {/* OG */}
        <meta
          property="og:title"
          content={`${pizza.name} | Pizzería Italiana`}
        />
        <meta
          property="og:description"
          content={`Descubre nuestra pizza ${pizza.name}. ${pizza.description}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={cldDetail(pizza.image, 1200)} />
        <meta property="og:url" content={`${DOMAIN}/pizza/${pizza.slug}`} />
        <meta property="og:site_name" content="Pizzería Italiana" />
        <meta property="og:locale" content="es_CL" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${pizza.name} | Pizzería Italiana`}
        />
        <meta
          name="twitter:description"
          content={`Descubre nuestra pizza ${pizza.name}. ${pizza.description}`}
        />
        <meta name="twitter:image" content={cldDetail(pizza.image, 1200)} />

        <meta name="theme-color" content="#000000" />
      </Helmet>

      <section className="bg-zinc-950 text-white py-28 lg:py-36">
        <LazyMotion features={domAnimation}>
          <m.div
            variants={pageFadeUp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-start"
          >
            {/* IMAGEN */}
            <div className="relative group">
              <div className="absolute inset-0 -z-10 flex justify-center">
                <div className="w-[70%] h-40 bg-red-500/20 blur-3xl rounded-full" />
              </div>
              <img
                src={cldDetail(pizza.image, 1200)}
                srcSet={cldDetailSrcSet(pizza.image)}
                sizes="(max-width:1024px) 95vw, 560px"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                width="1200"
                height="900"
                alt={`Pizza artesanal ${pizza.name}`}
                className="w-full h-[420px] object-cover rounded-3xl shadow-xl"
              />

              <span className="absolute top-4 left-4 bg-red-600 text-sm px-3 py-1 rounded-full shadow">
                🍕 Artesanal
              </span>
            </div>

            {/* CONTENIDO */}
            <m.div className="space-y-6">
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-zinc-400 hover:text-red-500 transition"
              >
                ← Volver al menú
              </button>

              <div>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                  {pizza.name}
                </h2>

                <p className="text-red-500 mt-1 italic">
                  Pizzería y sabores de Italia 🇮🇹
                </p>

                {/* contexto mesa */}
                {mesa && (
                  <p className="text-xs text-zinc-500 mt-2">Mesa {mesa}</p>
                )}
              </div>

              <p className="text-zinc-300 text-lg leading-relaxed">
                {pizza.longDescription}
              </p>

              {/* INGREDIENTES */}
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

              {/* PRECIO + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-6 border-t border-zinc-700">
                <span className="text-3xl font-bold text-red-500">
                  {pizza.price}
                </span>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    bg-green-700 hover:bg-green-800
                    text-white font-semibold
                    px-6 py-3 rounded-xl
                    shadow-lg transition
                  "
                >
                  📲 Pedir por WhatsApp
                </a>
              </div>

              {/* INFO */}
              <div className="text-sm text-zinc-400 pt-4">
                ⏱️ Preparación artesanal · 20-30 min 📍 Retiro en local o
                despacho
              </div>
            </m.div>
          </m.div>
        </LazyMotion>
      </section>
    </>
  );
};

export default PizzaDetail;
