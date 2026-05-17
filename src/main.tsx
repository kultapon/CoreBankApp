import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./app/router/router";
import { QueryProvider } from "./app/providers/query-provider";
import { AuthProvider } from "./app/providers/auth-provider";
import { setupInterceptors } from "./shared/api/setup-interceptors";

setupInterceptors();

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <RouterProvider
          router={router}
        />
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>,
);