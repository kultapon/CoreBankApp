import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useState } from "react";

import { CategoryForm } from "./category-form";

import { useUpdateCategory } from "../hooks/use-update-category";

import type { Category } from "@/entities/category/model/category.types";

interface Props {
  category: Category;
}

export const EditCategoryDialog =
  ({
    category,
  }: Props) => {
    const [open, setOpen] =
      useState(false);

    const updateMutation =
      useUpdateCategory();

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
              Edit category
            </DialogTitle>
          </DialogHeader>

          <CategoryForm
            defaultValues={{
              name:
                category.name,
            }}
            isPending={
              updateMutation.isPending
            }
            onSubmit={async (
              values,
            ) => {
              await updateMutation.mutateAsync(
                {
                  categoryId:
                    category.id,

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