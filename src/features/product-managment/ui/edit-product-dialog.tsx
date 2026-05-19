import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { ProductForm } from "./product-form";

import { useState } from "react";

import { useUpdateProduct } from "../hooks/use-update-product";

import type { Product } from "@/entities/product/model/product.types";

interface Props {
  product: Product;
}

export const EditProductDialog =
  ({
    product,
  }: Props) => {
    const [open, setOpen] =
      useState(false);

    const updateMutation =
      useUpdateProduct();

    return (
      <Dialog
        open={open}
        onOpenChange={
          setOpen
        }
      >
        <DialogTrigger
          asChild
        >
          <Button
            variant="outline"
          >
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit product
            </DialogTitle>
          </DialogHeader>

          <ProductForm
            defaultValues={{
              name:
                product.name,

              description:
                product.description ??
                "",

              price_rub:
                Number(
                  product.price_rub,
                ),

              common_note:
                product.common_note ??
                "",

              special_note:
                product.special_note ??
                "",

              category_id:
                product
                  .category
                  .id,
            }}
            isPending={
              updateMutation.isPending
            }
            onSubmit={async (
              values,
            ) => {
              await updateMutation.mutateAsync(
                {
                  productId:
                    product.id,

                  data: values,
                },
              );

              setOpen(
                false,
              );
            }}
          />
        </DialogContent>
      </Dialog>
    );
  };