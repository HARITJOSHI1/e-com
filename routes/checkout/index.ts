import { createRouter } from "@/lib/helpers/hono";
import * as handlers from "./handler";
import * as routes from "./route";

const checkout = createRouter()
  .openapi(routes.createCheckoutForAProduct, handlers.createCheckoutForAProduct)
  .openapi(routes.createCheckoutForCart, handlers.createCheckoutForCart);

export default checkout;
