import {
  createBrowserRouter,
} from "react-router-dom";

import { LoginPage } from "../../pages/login-page";

import { ProductsPage } from "../../pages/products-page";

import { ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <ProductsPage />,
      },
    ],
  },
]);