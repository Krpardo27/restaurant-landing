import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./views/Home";
import { lazy, Suspense } from "react";
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
]);

export default router;
