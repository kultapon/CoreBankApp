import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/features/auth/store/auth.store";

import { tokenStorage } from "@/features/auth/token.storage";

export const Header = () => {
  const navigate =
    useNavigate();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const logout =
    useAuthStore(
      (state) =>
        state.logout,
    );

  const handleLogout =
    () => {
      tokenStorage.clear();

      logout();

      navigate(
        "/login",
      );
    };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">
            CoreBank
          </h1>

          <nav className="flex items-center gap-4 text-sm">
            <button
              onClick={() =>
                navigate(
                  "/",
                )
              }
              className="text-slate-600 transition hover:text-black"
            >
              Products
            </button>

            {user?.role ===
              "moderator" && (
              <button
                onClick={() =>
                  navigate(
                    "/categories",
                  )
                }
                className="text-slate-600 transition hover:text-black"
              >
                Categories
              </button>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm">
            <div className="font-medium">
              {
                user?.username
              }
            </div>

            <div className="text-xs text-slate-500">
              {
                user?.role
              }
            </div>
          </div>

          <Button
            variant="outline"
            onClick={
              handleLogout
            }
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};