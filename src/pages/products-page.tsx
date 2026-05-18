import { useState } from "react";

import { useProducts } from "../entities/product/hooks/use-products";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export const ProductsPage = () => {
  const [page, setPage] =
    useState(1);

  const productsQuery =
    useProducts({
      page,
      size: 6,
    });

  if (productsQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (
    productsQuery.isError ||
    !productsQuery.data
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Products loading error
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <div className="text-sm text-slate-500">
            Total:{" "}
            {
              productsQuery.data
                .total
            }
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {productsQuery.data.items.map(
            (product) => (
              <Card
                key={product.id}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>
                      {
                        product.name
                      }
                    </span>

                    <span className="text-base font-normal text-slate-500">
                      ₽
                      {
                        product.price_rub
                      }
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-600">
                    {
                      product.description
                    }
                  </p>

                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium">
                        Category:
                      </span>{" "}
                      {
                        product
                          .category
                          .name
                      }
                    </div>

                    <div>
                      <span className="font-medium">
                        Creator:
                      </span>{" "}
                      {
                        product
                          .creator
                          .username
                      }
                    </div>
                  </div>

                  {product.common_note && (
                    <div className="rounded bg-slate-100 p-2 text-sm text-slate-700">
                      {
                        product.common_note
                      }
                    </div>
                  )}
                </CardContent>
              </Card>
            ),
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() =>
              setPage(
                (prev) =>
                  prev - 1,
              )
            }
            disabled={page === 1}
          >
            Previous
          </Button>

          <div className="text-sm font-medium">
            Page {page} of{" "}
            {
              productsQuery.data
                .pages
            }
          </div>

          <Button
            variant="outline"
            onClick={() =>
              setPage(
                (prev) =>
                  prev + 1,
              )
            }
            disabled={
              page >=
              productsQuery.data
                .pages
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};