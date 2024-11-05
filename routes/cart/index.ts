import { createRouter } from "@/lib/helpers/hono";
import * as handlers from "./handler";
import * as routes from "./route";

const cart = createRouter()
  .openapi(routes.addToCart, handlers.pushToCart)
  .openapi(routes.listAllCartItems, handlers.allcartItems)
  .openapi(routes.deleteItemFromCart, handlers.deleteProductsFromCart);

export default cart;
