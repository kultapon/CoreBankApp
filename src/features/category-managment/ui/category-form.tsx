import {
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  categoryFormSchema,
  type CategoryFormValues,
} from "../model/category-from.schema";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

interface Props {
  defaultValues?: Partial<CategoryFormValues>;

  isPending?: boolean;

  onSubmit: (
    values: CategoryFormValues,
  ) => void;
}

export const CategoryForm = ({
  defaultValues,
  isPending,
  onSubmit,
}: Props) => {
  const form =
    useForm<CategoryFormValues>({
      resolver:
        zodResolver(
          categoryFormSchema,
        ),

      defaultValues: {
        name:
          defaultValues?.name ??
          "",
      },
    });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(
        onSubmit,
      )}
    >
      <Input
        placeholder="Category name"
        {...form.register(
          "name",
        )}
      />

      <Button
        className="w-full"
        disabled={
          isPending
        }
        type="submit"
      >
        Save
      </Button>
    </form>
  );
};