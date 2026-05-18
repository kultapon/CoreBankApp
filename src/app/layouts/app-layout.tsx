import { Outlet } from "react-router-dom";

import { Header } from "@/widgets/header";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
};