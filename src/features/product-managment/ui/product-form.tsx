import {
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  productFormSchema,
  type ProductFormValues,
} from "../model/product-form.schema";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCategories } from "@/entities/category/hooks/use-categories";

import { useAuthStore } from "@/features/auth/store/auth.store";

interface Props {
  defaultValues?: Partial<ProductFormValues>;

  isPending?: boolean;

  onSubmit: (
    values: ProductFormValues,
  ) => void;
}

export const ProductForm = ({
  defaultValues,
  isPending,
  onSubmit,
}: Props) => {
  const user = useAuthStore(
    (state) => state.user,
  );

  const {
    data: categories,
  } = useCategories();

  const form =
    useForm<ProductFormValues>({
      resolver:
        zodResolver(
          productFormSchema,
        ),

      defaultValues: {
        name:
          defaultValues?.name ??
          "",

        description:
          defaultValues?.description ??
          "",

        price_rub:
          defaultValues?.price_rub ??
          0,

        common_note:
          defaultValues?.common_note ??
          "",

        special_note:
          defaultValues?.special_note ??
          "",

        category_id:
          defaultValues?.category_id ??
          0,
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
        placeholder="Name"
        {...form.register(
          "name",
        )}
      />

      <Textarea
        placeholder="Description"
        {...form.register(
          "description",
        )}
      />

      <Input
        type="number"
        step="0.01"
        placeholder="Price BYN"
        {...form.register(
          "price_rub",
        )}
      />

      <Textarea
        placeholder="Common note"
        {...form.register(
          "common_note",
        )}
      />

      {user?.role ===
        "moderator" && (
        <Textarea
          placeholder="Special note"
          {...form.register(
            "special_note",
          )}
        />
      )}

      <Select
        defaultValue={String(
          form.watch(
            "category_id",
          ),
        )}
        onValueChange={(
          value,
        ) =>
          form.setValue(
            "category_id",
            Number(value),
          )
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>
          {categories?.map(
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