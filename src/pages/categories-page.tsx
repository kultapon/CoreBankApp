import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";

import { useCategories } from "@/entities/category/hooks/use-categories";

import { Card } from "@/components/ui/card";

import { CreateCategoryDialog } from "@/features/category-managment/ui/create-category-dialog";

import { EditCategoryDialog } from "@/features/category-managment/ui/edit-category-dialog";

import { DeleteCategoryDialog } from "@/features/category-managment/ui/delete-category-dialog";

export const CategoriesPage = () => {
  const user = useAuthStore(
    (state) => state.user,
  );

  const {
    data: categories,
    isLoading,
  } = useCategories();

  if (
    user?.role !==
    "moderator"
  ) {
    return (
      <Navigate to="/" />
    );
  }

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Categories
        </h1>

        <CreateCategoryDialog />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories?.map(
          (category) => (
            <Card
              key={
                category.id
              }
              className="p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="font-medium">
                  {
                    category.name
                  }
                </div>

                <div className="flex gap-2">
                  <EditCategoryDialog
                    category={
                      category
                    }
                  />

                  <DeleteCategoryDialog
                    categoryId={
                      category.id
                    }
                  />
                </div>
              </div>
            </Card>
          ),
        )}
      </div>
    </div>
  );
};