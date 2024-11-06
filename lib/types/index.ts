import { cartResponseSchema } from "@/routes/cart/schema";
import { OpenAPIHono, z } from "@hono/zod-openapi";
import { Ratelimit } from "@upstash/ratelimit";

declare module "hono" {
  interface ContextVariableMap {
    ratelimit: Ratelimit;
  }
}

export type AppOpenAPI = OpenAPIHono;
export type TResponseJson = {
  message: string;
};

export type TCartItem = z.infer<typeof cartResponseSchema>;
