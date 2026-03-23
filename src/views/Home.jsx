import { lazy, Suspense } from "react";

import Pizzas from "../sections/Pizzas";
import About from "../sections/About";
import Hero from "../sections/Hero";
import HeroSlider from "../components/HeroSlider";

const Gallery = lazy(() => import("../sections/Gallery"));

const Home = () => {
  return (
    <>
      <Hero />
      <Pizzas />
      <About />
      <HeroSlider />
      <Suspense fallback={null}>
        <Gallery />
      </Suspense>
    </>
  );
};

export default Home;
