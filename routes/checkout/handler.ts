import db from "@/lib/db";
import { orders, transaction } from "@/lib/db/schema";
import { RouteHandler } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  CreateCheckoutForAProductRoute,
  CreateCheckoutForCartRoute,
} from "./route";
import { eq, inArray } from "drizzle-orm";
import { getCookie } from "hono/cookie";

export const createCheckoutForAProduct: RouteHandler<
  CreateCheckoutForAProductRoute
> = async (ctx) => {
  const { user, product, billingAddress } = ctx.req.valid("json");
  const { id: productId } = ctx.req.valid("param");

  const checkoutResponse = await db
    .insert(orders)
    .values({
      userId: user.info.id,
      productId,
      billingAddressId: billingAddress.id,
      shippingAddressId: user.shippingAddress.id,
      amount: product.price,
      status: "fulfilled",
      isPaid: true,
    })
    .returning();

  if (
    !checkoutResponse ||
    checkoutResponse.length === 0 ||
    checkoutResponse[0].status === "failed"
  ) {
    return ctx.json(
      { message: "Checkout creation failed" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  const transactionResponse = (
    await db
      .insert(transaction)
      .values({
        userId: user.info.id,
        amount: product.price,
      })
      .returning()
  )[0];

  await db
    .update(orders)
    .set({ transactionId: transactionResponse.id })
    .where(eq(orders.id, checkoutResponse[0].id));

  return ctx.json(
    { message: `Payment successfull for product ${product.name}` },
    HttpStatusCodes.OK
  );
};

export const createCheckoutForCart: RouteHandler<
  CreateCheckoutForCartRoute
> = async (ctx) => {
  const { user, billingAddress, totalPrice, products } = ctx.req.valid("json");

  if (!getCookie(ctx, "cartToken"))
    return ctx.json(
      {
        message: "Cart token not found. Might be cart is empty.",
      },
      HttpStatusCodes.BAD_REQUEST
    );

  const checkoutPromises = products.map((p) =>
    db
      .insert(orders)
      .values({
        userId: user.info.id,
        productId: p.id,
        billingAddressId: billingAddress.id,
        shippingAddressId: user.shippingAddress.id,
        amount: p.price,
        status: "fulfilled",
        isPaid: true,
      })
      .returning()
  );

  const checkoutResponse = (await Promise.all(checkoutPromises)).flat();

  if (checkoutResponse.filter((c) => c.status === "failed").length > 0)
    return ctx.json(
      { message: "Checkout creation failed" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );

  if (!checkoutResponse || checkoutResponse.length === 0)
    return ctx.json(
      { message: "Checkout creation failed" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );

  const transactionResponse = (
    await db
      .insert(transaction)
      .values({
        userId: user.info.id,
        amount: totalPrice,
      })
      .returning()
  )[0];

  await db
    .update(orders)
    .set({ transactionId: transactionResponse.id })
    .where(
      inArray(
        orders.id,
        checkoutResponse.map((c) => c.id)
      )
    );

  return ctx.json(
    {
      message: `Payment successful for ${checkoutResponse.length} products`,
    },
    HttpStatusCodes.OK
  );
};
