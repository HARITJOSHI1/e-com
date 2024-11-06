import { TCart } from "@/lib/db/schema";
import { z } from "zod";
import { productResponseSchema } from "../products/schema";

export const cartBodySchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  userId: z.string().default(crypto.randomUUID()),
});

const augmentedProductSchema = productResponseSchema
  .pick({
    id: true,
    name: true,
    price: true,
    img_url: true,
  })
  .extend({ quantity: z.number() });

export const cartResponseSchema = z.object({
  userId: z.string(),
  products: augmentedProductSchema.array(),
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

export const updateCartProdQuantitySchema = z.object({
  data: cartQueryParamsSchema.pick({ quantity: true }),
  up: z.coerce
    .boolean()
    .optional()
    .openapi({
      param: {
        name: "up",
        in: "query",
      },
    }),
});
