import db from "@/lib/db";
import { cart, products } from "@/lib/db/schema";
import { RouteHandler, z } from "@hono/zod-openapi";
import { desc, eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  AddToCartRoute,
  DeleteItemFromCartRoute,
  ListAllCartItemsRoute,
} from "./route";
import { cartResponseSchema } from "./schema";

export const pushToCart: RouteHandler<AddToCartRoute> = async (ctx) => {
  const { productId, userId, quantity } = ctx.req.valid("json");
  const ifItemExists = (
    await db
      .select({ productId: cart.productId, quantity: cart.quantity })
      .from(cart)
      .where(eq(cart.productId, productId))
  )[0];

  if(ifItemExists) {
    await db
      .update(cart)
      .set({
        quantity: ifItemExists.quantity! + quantity,
      })
      .where(eq(cart.productId, productId))
      .returning();

    return ctx.json({ message: "Product added to the cart" }, HttpStatusCodes.OK);
  }

  await db
    .insert(cart)
    .values({
      productId,
      userId,
      quantity,
    })
    .returning();

  return ctx.json({ message: "Product added to the cart" }, HttpStatusCodes.OK);
};

export const allcartItems: RouteHandler<ListAllCartItemsRoute> = async (
  ctx
) => {
  const { page: p, count: c } = ctx.req.valid("query");
  const page = p || 1;
  const count = c || 10;

  const skip = (+page - 1) * count;

  const allCartItems = await db
    .select({
      createdAt: cart.createdAt,
      productId: cart.productId,
      userId: cart.userId,
    })
    .from(cart)
    .orderBy(desc(cart.createdAt))
    .offset(skip)
    .limit(count);

  if (allCartItems.length === 0) {
    return ctx.json(
      { message: "No products in the cart" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  const fetchRequestsForProdsInCart = allCartItems.map(async (item) =>
    db
      .select({
        name: products.name,
        price: products.price,
        img_url: products.img_url,
      })
      .from(products)
      .where(eq(products.id, item.productId!))
  );

  const prodsInCart = (await Promise.all(fetchRequestsForProdsInCart)).flat();

  const allCartItemsWithProds = {
    userId: allCartItems[0].userId!,
    products: prodsInCart,
  } as z.infer<typeof cartResponseSchema>;

  return ctx.json(allCartItemsWithProds, HttpStatusCodes.OK);
};

export const deleteProductsFromCart: RouteHandler<
  DeleteItemFromCartRoute
> = async (ctx) => {
  const { id } = ctx.req.valid("param");

  await db.delete(cart).where(eq(cart.productId, id)).returning();

  return ctx.json(
    { message: "Product deleted successfully" },
    HttpStatusCodes.OK
  );
};
