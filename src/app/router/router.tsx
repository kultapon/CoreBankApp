import {
  createBrowserRouter,
} from "react-router-dom";

import { LoginPage } from "@/pages/login-page";

import { ProductsPage } from "@/pages/products-page";

import { CategoriesPage } from "@/pages/categories-page";


import { ProtectedRoute } from "./protected-route";

import { AppLayout } from "../layouts/app-layout";

export const router =
  createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      element: <ProtectedRoute />,

      children: [
        {
          element: <AppLayout />,

          children: [
            {
              path: "/",

              element:
                <ProductsPage />,
            },
            {
              path:
                "/categories",

              element:
                <CategoriesPage />,
            },
          ],
        },
      ],
    },
  ]);