import { pathParamSchema, queryParamsSchema } from "@/lib/global/schemas";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { productResponseSchema } from "./schema";
import { TProduct } from "@/lib/db/schema";


const tags = ["Products"];

// PRODUCT ROUTES
export const getAllProducts = createRoute({
  path: "/products",
  method: "get",
  tags,
  request: {
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(productResponseSchema as z.ZodSchema<TProduct>),
      "List of products"
    ),
  },
});

export const getSingleProduct = createRoute({
  path: "/products/{id}",
  method: "get",
  tags,
  request: {
    params: pathParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      productResponseSchema as z.ZodSchema<TProduct>,
      "A single product"
    ),

    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND),
      "Product not found"
    ),
  },
});

// ROUTE TYPES
export type GetAllProductRoute = typeof getAllProducts;
export type GetSingleProductRoute = typeof getSingleProduct;
