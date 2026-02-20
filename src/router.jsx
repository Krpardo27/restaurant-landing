import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./views/Home";
import PizzaDetail from "./views/PizzaDetail";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "pizza/:slug", element: <PizzaDetail /> },
    ],
  },
]);

export default router;
