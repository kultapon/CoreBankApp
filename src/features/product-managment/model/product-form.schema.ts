import { z } from "zod";

export const productFormSchema =
  z.object({
    name: z
      .string()
      .min(2)
      .max(255),

    description:
      z.string().optional(),

    price_rub: z.coerce
      .number()
      .positive(),

    common_note:
      z.string().optional(),

    special_note:
      z.string().optional(),

    category_id:
      z.coerce.number(),
  });

export type ProductFormValues =
  z.infer<
    typeof productFormSchema
  >;