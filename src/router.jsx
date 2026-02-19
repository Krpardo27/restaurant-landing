import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import GallerySlider from "./sections/GallerySlider";
import PizzaDetail from "./views/PizzaDetail";
import Home from "./views/Home";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "gallery", element: <GallerySlider /> },
      { path: "pizza/:slug", element: <PizzaDetail /> },
    ],
  },
]);

export default router;
