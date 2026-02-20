import { lazy, Suspense } from "react";

import HeroSlider from "../sections/HeroSlider";
import Pizzas from "../sections/Pizzas";
import Menu from "../sections/Menu";
import About from "../sections/About";

const GallerySlider = lazy(() => import("../sections/GallerySlider"));

const Home = () => {
  return (
    <>
      <HeroSlider />
      <Pizzas />
      <Menu />
      <About />

      <Suspense fallback={null}>
        <GallerySlider />
      </Suspense>
    </>
  );
};

export default Home;
