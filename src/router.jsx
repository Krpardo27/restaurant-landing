import { createBrowserRouter, Link } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "./layout/MainLayout";
import QRLayout from "./layout/QRLayout";

import Home from "./views/Home";
import MenuQR from "./views/MenuQR";

import PizzaLoader from "./components/PizzaLoader";
import RouteError from "./components/RouteError";

const PizzaDetail = lazy(() => import("./views/PizzaDetail.jsx"));

// This static app has no authentication backend. Keep its local QR utility out
// of production rather than presenting a client-side password as protection.
const adminRoutes = import.meta.env.DEV
  ? [{
      path: "/admin/mesas",
      hydrateFallbackElement: <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white"><p role="status">Preparando códigos QR…</p></main>,
      lazy: async () => ({ Component: (await import("./views/MesasQR.jsx")).default }),
      errorElement: <RouteError />,
    }]
  : [];

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <RouteError />,
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
    errorElement: <RouteError />,
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
  ...adminRoutes,
  {
    path: "*",
    errorElement: <RouteError />,
    element: (
      <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-3xl font-bold">Página no encontrada</h1>
        <p className="text-zinc-300">La dirección que buscas no existe.</p>
        <Link to="/" className="text-red-400 underline underline-offset-4">Volver al inicio</Link>
      </main>
    ),
  },
]);

export default router;
