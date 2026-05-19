import { z } from "zod";

export const categoryFormSchema =
  z.object({
    name: z
      .string()
      .min(2)
      .max(255),
  });

export type CategoryFormValues =
  z.infer<
    typeof categoryFormSchema
  >;