import { useSearchParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useProducts } from "@/entities/product/hooks/use-products";

import { ProductPrice } from "@/entities/product/ui/product-price";

import { useAuthStore } from "@/features/auth/store/auth.store";

import {
  canDeleteProduct,
  canEditProduct,
} from "../shared/permissions";

import { CreateProductDialog } from "../features/product-managment/ui/create-product-dialog";

import { EditProductDialog } from "../features/product-managment/ui/edit-product-dialog";

import { DeleteProductDialog } from "../features/product-managment/ui/delete-product-dialog";

export const ProductsPage = () => {
  const user = useAuthStore(
    (state) => state.user,
  );

  const [searchParams, setSearchParams] =
    useSearchParams();

  const q =
    searchParams.get("q") ??
    "";

  const sortBy =
    searchParams.get(
      "sort_by",
    ) ??
    "created_at";

  const order =
    (searchParams.get(
      "order",
    ) as
      | "asc"
      | "desc") ??
    "desc";

  const {
    data,
    isLoading,
  } = useProducts({
    q,
    sort_by:
      sortBy,
    order,
    page: 1,
    size: 20,
  });

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search products..."
          value={q}
          onChange={(
            event,
          ) => {
            const value =
              event.target.value;

            const params =
              new URLSearchParams(
                searchParams,
              );

            if (
              value
            ) {
              params.set(
                "q",
                value,
              );
            } else {
              params.delete(
                "q",
              );
            }

            setSearchParams(
              params,
            );
          }}
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
          <Select
            value={
              sortBy
            }
            onValueChange={(
              value,
            ) => {
              const params =
                new URLSearchParams(
                  searchParams,
                );

              params.set(
                "sort_by",
                value,
              );

              setSearchParams(
                params,
              );
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="created_at">
                Created at
              </SelectItem>

              <SelectItem value="price_rub">
                Price
              </SelectItem>

              <SelectItem value="name">
                Name
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              const params =
                new URLSearchParams(
                  searchParams,
                );

              params.set(
                "order",
                order ===
                  "asc"
                  ? "desc"
                  : "asc",
              );

              setSearchParams(
                params,
              );
            }}
          >
            {order ===
            "asc"
              ? "ASC"
              : "DESC"}
          </Button>

          <CreateProductDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data?.items.map(
          (
            product,
          ) => (
            <Card
              key={
                product.id
              }
            >
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-3">
                  <span>
                    {
                      product.name
                    }
                  </span>

                  <div className="flex items-center gap-2">
                    {canEditProduct(
                      user,
                      product,
                    ) && (
                      <EditProductDialog
                        product={
                          product
                        }
                      />
                    )}

                    {canDeleteProduct(
                      user,
                    ) && (
                      <DeleteProductDialog
                        productId={
                          product.id
                        }
                      />
                    )}
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 text-sm">
                <div>
                  {
                    product.description
                  }
                </div>

                <div className="font-medium">
                  Category:{" "}
                  {
                    product
                      .category
                      .name
                  }
                </div>

                <div className="flex items-center gap-1 font-semibold">
                  <ProductPrice
                    productId={
                      product.id
                    }
                    priceRub={
                      product.price_rub
                    }
                  />
                </div>

                <div className="rounded-md bg-slate-100 p-2">
                  <div className="text-xs text-slate-500">
                    Common
                    note
                  </div>

                  <div>
                    {
                      product.common_note
                    }
                  </div>
                </div>

                {user?.role ===
                  "moderator" &&
                  product.special_note && (
                    <div className="rounded-md bg-red-50 p-2">
                      <div className="text-xs text-red-500">
                        Special
                        note
                      </div>

                      <div>
                        {
                          product.special_note
                        }
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </div>
  );
};