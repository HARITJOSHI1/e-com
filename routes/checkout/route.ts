import { pathParamSchema } from "@/lib/global/schemas";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import {
  checkoutBodyForAProductSchema,
  checkoutBodyForCartSchema
} from "./schema";

const tags = ["Checkout"];

export const createCheckoutForAProduct = createRoute({
  path: "/checkout/product/{id}",
  method: "post",
  tags,
  request: {
    params: pathParamSchema,
    body: jsonContent(checkoutBodyForAProductSchema, "Product checkout body"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Checkout created successfully"
    ),

    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ message: z.string() }),
      "No product to create checkout"
    ),

    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({ message: z.string() }),
      "Internal server error"
    ),
  },
});

export const createCheckoutForCart = createRoute({
  path: "/checkout/cart",
  method: "post",
  tags,
  request: {
    body: jsonContent(checkoutBodyForCartSchema, "Cart Checkout body"),
  },

  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Checkout created successfully"
    ),

    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ message: z.string() }),
      "No cart to create checkout"
    ),

    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({ message: z.string() }),
      "Internal server error"
    ),
  },
});

// ROUTE TYPES
export type CreateCheckoutForAProductRoute = typeof createCheckoutForAProduct;
export type CreateCheckoutForCartRoute = typeof createCheckoutForCart;
