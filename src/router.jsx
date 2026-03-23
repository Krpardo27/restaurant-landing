import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "./layout/MainLayout";
import QRLayout from "./layout/QRLayout";

import Home from "./views/Home";
import MenuQR from "./views/MenuQR";
import MesasQR from "./views/MesasQR";

import PizzaLoader from "./components/PizzaLoader";

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
    ],
  },
  {
    path: "/menu",
    element: <QRLayout />,
    children: [
      { index: true, element: <MenuQR /> },
      {
        path: "pizza/:slug",
        element: (
          <Suspense fallback={<PizzaLoader />}>
            <PizzaDetail />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin/mesas",
    element: <MesasQR />,
  },
]);

export default router;
