import { userSchema } from "@/lib/global/schemas";
import { z } from "zod";
import { productResponseSchema } from "../products/schema";

export const checkoutQueryParamsSchema = z.object({
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
});

export const shippingAddressSchema = z.object({
  id: z.string(),
  name: z.string(),
  street: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  state: z.string(),
  phoneNumber: z.string(),
});

export const billingAddressSchema = z.object({
  id: z.string(),
  name: z.string(),
  street: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  state: z.string(),
  phoneNumber: z.string(),
});

export const checkoutBodyForAProductSchema = z.object({
  user: z.object({
    info: userSchema.pick({ id: true }),
    shippingAddress: shippingAddressSchema.pick({ id: true }),
  }),

  billingAddress: billingAddressSchema.pick({ id: true }),
  product: productResponseSchema.pick({ price: true, name: true }),
});

export const checkoutBodyForCartSchema = z.intersection(
  checkoutBodyForAProductSchema.pick({ user: true, billingAddress: true }),
  z.object({
    totalPrice: z.number(),
    products: productResponseSchema
      .pick({ id: true, price: true, name: true })
      .array(),
  })
);
