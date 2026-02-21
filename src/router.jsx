import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./views/Home";
import { lazy, Suspense } from "react";

const PizzaDetail = lazy(() => import("./views/PizzaDetail"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "pizza/:slug",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PizzaDetail />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
