import { useState } from "react";

import { useProducts } from "../entities/product/hooks/use-products";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui";

export const ProductsPage = () => {
  const [page, setPage] =
    useState(1);

  const productsQuery =
    useProducts({
      page,
      size: 10,
    });

  if (productsQuery.isLoading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (productsQuery.isError) {
    return (
      <div className="p-6">
        Products loading error
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Products
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {productsQuery.data?.items.map(
              (product) => (
                <div
                  key={product.id}
                  className="rounded border p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      {product.name}
                    </h3>

                    <span>
                      ₽
                      {
                        product.price_rub
                      }
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-600">
                    {
                      product.description
                    }
                  </p>

                  <div className="mt-3 text-sm text-slate-500">
                    Category:{" "}
                    {
                      product.category
                        .name
                    }
                  </div>

                  <div className="text-sm text-slate-500">
                    Creator:{" "}
                    {
                      product.creator
                        .username
                    }
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={() =>
                setPage(
                  (prev) =>
                    prev - 1,
                )
              }
              disabled={page === 1}
              className="rounded border px-3 py-1"
            >
              Prev
            </button>

            <div>
              Page {page}
            </div>

            <button
              onClick={() =>
                setPage(
                  (prev) =>
                    prev + 1,
                )
              }
              disabled={
                page >=
                (productsQuery.data
                  ?.pages ??
                  1)
              }
              className="rounded border px-3 py-1"
            >
              Next
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};