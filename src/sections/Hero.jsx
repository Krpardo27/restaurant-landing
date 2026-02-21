import { Link } from "react-scroll";
import { cldHero, cldHeroSrcSet } from "../utils/cloudinary";

const heroImage = "pizzas/hero-1_wpoo1v";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] lg:min-h-[800px] flex items-center justify-center overflow-hidden"
    >
      <img
        src={cldHero(heroImage, 1600)}
        srcSet={cldHeroSrcSet(heroImage)}
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        alt="Pizzas artesanales recién horneadas"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Texto */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Pizzas artesanales hechas con pasión 🍕
        </h1>

        <p className="text-lg md:text-2xl text-neutral-200 mb-8">
          Masa de fermentación lenta, ingredientes frescos y recetas auténticas
          de Italia.
        </p>

        <Link
          to="pizzas"
          smooth={true}
          duration={600}
          offset={-80} 
          className="inline-block bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full text-white font-semibold shadow-lg transition cursor-pointer"
        >
          Ver nuestras pizzas 🍕
        </Link>
      </div>
    </section>
  );
};

export default Hero;
