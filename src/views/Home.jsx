import { lazy, Suspense } from "react";

import Pizzas from "../sections/Pizzas";
import Menu from "../sections/Menu";
import About from "../sections/About";
import Hero from "../sections/Hero";
import HeroSlider from "../components/HeroSlider";

const Gallery = lazy(() => import("../sections/Gallery"));

const Home = () => {
  return (
    <>
      <Hero />
      <Pizzas />
      <Menu />
      <HeroSlider />
      <About />

      <Suspense fallback={null}>
        <Gallery />
      </Suspense>
    </>
  );
};

export default Home;
