import { pathParamSchema, queryParamsSchema } from "@/lib/global/schemas";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import {
  cartBodySchema,
  cartResponseSchema,
  updateCartProdQuantitySchema,
} from "./schema";

const tags = ["Cart"];

export const addToCart = createRoute({
  path: "/cart",
  method: "post",
  tags,
  request: {
    body: jsonContent(cartBodySchema, "art Body"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.literal("Product added to the cart") }),
      "Add products to the cart"
    ),
  },
});

export const listAllCartItems = createRoute({
  path: "/cart",
  method: "get",
  tags,

  request: {
    query: queryParamsSchema,
  },

  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      cartResponseSchema,
      "All products in the cart"
    ),

    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ message: z.string() }),
      "Cart is empty"
    ),
  },
});

export const deleteItemFromCart = createRoute({
  path: "/cart/product/{id}",
  method: "delete",
  tags,

  request: {
    params: pathParamSchema,
  },

  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Delete product in the cart"
    ),
  },
});

export const updateItemFromCart = createRoute({
  path: "/cart/product/{id}",
  method: "patch",
  tags,

  request: {
    params: pathParamSchema,
    query: updateCartProdQuantitySchema,
  },

  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Delete product in the cart"
    ),
  },
});

// ROUTE TYPES
export type AddToCartRoute = typeof addToCart;
export type ListAllCartItemsRoute = typeof listAllCartItems;
export type DeleteItemFromCartRoute = typeof deleteItemFromCart;
export type UpdateItemFromCartRoute = typeof updateItemFromCart;
