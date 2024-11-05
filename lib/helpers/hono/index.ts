import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import configureOpenAPI from "../openapi/configureOpenApi";

export const createRouter = () => {
  return new OpenAPIHono({ strict: false, defaultHook });
};

export const createApp = () => {
  const app = createRouter();
  app.notFound(notFound);
  app.onError(onError);

  // for adding api docs endpoint
  configureOpenAPI(app);
  return app;
};
