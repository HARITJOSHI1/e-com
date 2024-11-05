import type { RouteHandler } from "@hono/zod-openapi";
import type { GetAllProductRoute, GetSingleProductRoute } from "./route";
import db from "@/lib/db";
import { products } from "@/lib/db/schema";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { desc, eq } from "drizzle-orm";

export const getAllProducts: RouteHandler<GetAllProductRoute> = async (ctx) => {
  const { page: p, count: c } = ctx.req.valid("query");
  const page = p || 1;
  const count = c || 10;
  
  const skip = (+page - 1) * count;

  const allProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .offset(skip)
    .limit(count);

  return ctx.json(allProducts, HttpStatusCodes.OK);
};

export const getSingleProducts: RouteHandler<GetSingleProductRoute> = async (
  ctx
) => {
  const { id } = ctx.req.valid("param");

  const singleProduct = (
    await db.select().from(products).where(eq(products.id, id))
  )[0];

  if (!singleProduct) {
    return ctx.json(
      { message: "Product not found" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return ctx.json(singleProduct, HttpStatusCodes.OK);
};
