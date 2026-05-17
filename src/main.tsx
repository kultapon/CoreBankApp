import React from "react";
import ReactDOM from "react-dom/client";

import {
  RouterProvider,
} from "react-router-dom";

import { router } from "./app/router/router";

import { QueryProvider } from "./app/providers/query-provider";

import { setupInterceptors } from "./shared/api/setup-interceptors";

setupInterceptors();

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <QueryProvider>
    <RouterProvider router={router} />
  </QueryProvider>,
);