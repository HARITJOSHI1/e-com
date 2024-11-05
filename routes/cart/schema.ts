import { TCart } from "@/lib/db/schema";
import { z } from "zod";
import { productResponseSchema } from "../products/schema";

export const cartBodySchema: z.ZodSchema<TCart> = z.object({
  productId: z.string(),
  quantitiy: z.number(),
  userId: z.string().default(crypto.randomUUID()),
});

export const cartResponseSchema = z.object({
  userId: z.string(),
  products:  productResponseSchema.pick({
    name: true,
    price: true,
    img_url: true,
  }).array()
});

export const cartQueryParamsSchema = z.object({
  productId: z.string().openapi({
    param: {
      name: "productId",
      in: "query",
    },
  }),

  userId: z.string().openapi({
    param: {
      name: "userId",
      in: "query",
    },
  }),

  quantity: z.coerce.number().openapi({
    param: {
      name: "quantity",
      in: "query",
    },
  }),
});
