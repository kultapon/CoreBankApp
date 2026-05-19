import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { useDeleteCategory } from "../hooks/use-delete-category";

interface Props {
  categoryId: number;
}

export const DeleteCategoryDialog =
  ({
    categoryId,
  }: Props) => {
    const deleteMutation =
      useDeleteCategory();

    return (
      <AlertDialog>
        <AlertDialogTrigger
          asChild
        >
          <Button
            variant="destructive"
          >
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete category?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() =>
                deleteMutation.mutate(
                  categoryId,
                )
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };