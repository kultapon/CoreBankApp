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

import { useCreateCategory } from "../hooks/use-create-category";

export const CreateCategoryDialog =
  () => {
    const [open, setOpen] =
      useState(false);

    const createMutation =
      useCreateCategory();

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
            Create category
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create category
            </DialogTitle>
          </DialogHeader>

          <CategoryForm
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