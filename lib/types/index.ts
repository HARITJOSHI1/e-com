import { Ratelimit } from "@upstash/ratelimit";

declare module "hono" {
    interface ContextVariableMap {
      ratelimit: Ratelimit;
    }
  }