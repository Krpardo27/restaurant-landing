import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./views/Home";
import { lazy, Suspense } from "react";
import PizzaLoader from "./components/PizzaLoader";
import MenuQR from "./views/MenuQR.jsx";

const PizzaDetail = lazy(() => import("./views/PizzaDetail.jsx"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "pizza/:slug",
        element: (
          <Suspense fallback={<PizzaLoader />}>
            <PizzaDetail />
          </Suspense>
        ),
      },
      {
        path: "menu",
        element: (
          <Suspense fallback={<PizzaLoader />}>
            <MenuQR />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
