import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import GallerySlider from "./sections/GallerySlider";
import PizzaDetail from "./views/PizzaDetail";
import Home from "./views/Home";
import PizzaLayout from "./layout/PizzaLayout";

const router = createBrowserRouter([
  {
    element: <MainLayout />, // layout raíz
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "gallery",
        element: <GallerySlider />,
      },
    ],
  },
  {
    element: <PizzaLayout />,
    children: [
      {
        path: "pizza/:slug",
        element: <PizzaDetail />,
      },
    ],
  },
]);

export default router;
