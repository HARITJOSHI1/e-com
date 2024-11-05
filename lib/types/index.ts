import { OpenAPIHono } from "@hono/zod-openapi";
import { Ratelimit } from "@upstash/ratelimit";

declare module "hono" {
  interface ContextVariableMap {
    ratelimit: Ratelimit;
  }
}

export type AppOpenAPI = OpenAPIHono;
