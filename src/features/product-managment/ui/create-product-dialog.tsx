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

import { useCreateProduct } from "../hooks/use-create-product";

export const CreateProductDialog =
  () => {
    const [open, setOpen] =
      useState(false);

    const createMutation =
      useCreateProduct();

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
          <Button>
            Create Product
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create product
            </DialogTitle>
          </DialogHeader>

          <ProductForm
            isPending={
              createMutation.isPending
            }
            onSubmit={async (
              values,
            ) => {
              await createMutation.mutateAsync(
                values,
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