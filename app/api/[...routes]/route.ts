import { handle } from "hono/vercel";
import { createApp } from "@/lib/helpers/hono";
import products from "@/routes/products";
import cart from "@/routes/cart";
import checkout from "@/routes/checkout";

// App setup
const app = createApp();

//all routes
const routes = [products, cart, checkout] as const;

routes.forEach((route) => {
  app.route("/api", route);
});

// hanlders exposed by our backend
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = (typeof routes)[number];