import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

import Pizzas from "../sections/Pizzas";
import About from "../sections/About";
import Hero from "../sections/Hero";
import HeroSlider from "../components/HeroSlider";

const Gallery = lazy(() => import("../sections/Gallery"));

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Nova | Pizzas artesanales y sabores de Italia</title>
        <meta name="description" content="Masa de fermentación lenta, ingredientes de verdad y sabores italianos para compartir. Descubre Nova, explora nuestra carta y elige tu próxima pizza favorita." />
      </Helmet>
      <Hero />
      <Pizzas />
      <About />
      <HeroSlider />
      <Suspense
        fallback={
          <section id="gallery" className="home-gallery-loading home-section" aria-busy="true">
            <div className="home-container">
              <p className="home-eyebrow" role="status">Preparando nuestros momentos…</p>
            </div>
          </section>
        }
      >
        <Gallery />
      </Suspense>
    </>
  );
};

export default Home;
