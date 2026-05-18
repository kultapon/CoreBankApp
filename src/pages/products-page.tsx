import {
  useEffect,
  useState,
} from "react";

import { useSearchParams } from "react-router-dom";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { ProductPrice } from "@/entities/product/ui/product-price";

import { useProducts } from "@/entities/product/hooks/use-products";

import { useCategories } from "@/entities/category/hooks/use-categories";

import { useAuthStore } from "@/features/auth/store/auth.store";

import { canSeeSpecialNote } from "@/shared/permissions";

import { useDebounce } from "@/shared/hooks/use-debounce";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ProductsPage = () => {
  const user = useAuthStore(
    (state) => state.user,
  );

  const [searchParams, setSearchParams] =
    useSearchParams();

  const page = Number(
    searchParams.get("page") ??
      1,
  );

  const q =
    searchParams.get("q") ??
    "";

  const categoryId =
    searchParams.get(
      "category_id",
    );

  const sortBy =
    searchParams.get(
      "sort_by",
    ) ?? "created_at";

  const order =
  (searchParams.get(
    "order",
  ) as
    | "asc"
    | "desc") ??
  "desc";

  const [
    searchValue,
    setSearchValue,
  ] = useState(q);

  const debouncedSearch =
    useDebounce(
      searchValue,
      500,
    );

  const updateParam = (
    key: string,
    value: string,
  ) => {
    const params =
      new URLSearchParams(
        searchParams,
      );

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    if (key !== "page") {
      params.set("page", "1");
    }

    setSearchParams(params);
  };

  useEffect(() => {
    updateParam(
      "q",
      debouncedSearch,
    );
  }, [debouncedSearch]);

  const productsQuery =
    useProducts({
      page,
      size: 6,

      q:
        q.length > 0
          ? q
          : undefined,

      category_id:
        categoryId
          ? Number(
              categoryId,
            )
          : undefined,

      sort_by: sortBy,

      order,
    });

  const categoriesQuery =
    useCategories();

  if (
    productsQuery.isLoading
  ) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (
    productsQuery.isError ||
    !productsQuery.data
  ) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        Products loading error
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row">
        <Input
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) =>
            setSearchValue(
              e.target.value,
            )
          }
        />

        <Select
          value={
            categoryId ??
            "all"
          }
          onValueChange={(
            value,
          ) =>
            updateParam(
              "category_id",
              value === "all"
                ? ""
                : value,
            )
          }
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All categories
            </SelectItem>

            {categoriesQuery.data?.items.map(
              (
                category,
              ) => (
                <SelectItem
                  key={
                    category.id
                  }
                  value={String(
                    category.id,
                  )}
                >
                  {
                    category.name
                  }
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(
            value,
          ) =>
            updateParam(
              "sort_by",
              value,
            )
          }
        >
          <SelectTrigger className="w-[220px]">
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

        <Select
          value={order}
          onValueChange={(
            value,
          ) =>
            updateParam(
              "order",
              value,
            )
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="asc">
              ASC
            </SelectItem>

            <SelectItem value="desc">
              DESC
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {productsQuery.data.items.map(
          (product) => (
            <Card
              key={product.id}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 text-lg">
                  <span>
                    {
                      product.name
                    }
                  </span>

                  <ProductPrice
                    productId={
                      product.id
                    }
                    priceRub={
                      product.price_rub
                    }
                  />
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600">
                  {
                    product.description
                  }
                </p>

                <div className="text-sm">
                  <span className="font-medium">
                    Category:
                  </span>{" "}
                  {
                    product
                      .category
                      .name
                  }
                </div>

                {product.common_note && (
                  <div className="rounded bg-slate-100 p-2 text-sm text-slate-700">
                    {
                      product.common_note
                    }
                  </div>
                )}

                {canSeeSpecialNote(
                  user,
                ) &&
                  product.special_note && (
                    <div className="rounded bg-amber-100 p-2 text-sm text-amber-800">
                      {
                        product.special_note
                      }
                    </div>
                  )}
              </CardContent>
            </Card>
          ),
        )}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() =>
            updateParam(
              "page",
              String(
                page - 1,
              ),
            )
          }
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
          disabled={
            page >=
            productsQuery.data
              .pages
          }
          onClick={() =>
            updateParam(
              "page",
              String(
                page + 1,
              ),
            )
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};