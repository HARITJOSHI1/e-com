import { createRouter } from "@/lib/helpers/hono";
import * as handlers from "./handler";
import * as routes from "./route";

const products = createRouter()
  .openapi(routes.getAllProducts, handlers.getAllProducts)
  .openapi(routes.getSingleProduct, handlers.getSingleProducts);
  
export default products;
