import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { dummyValidator } from "../validators/sample-validator";

const sampleValidator = zValidator("json", dummyValidator);

export const yourRouter = new Hono().post(sampleValidator, async (ctx) => {
  // add rate limit (optional)
  const body = ctx.req.valid("json");
  //  query the database

  // response
  return ctx.json(
    {
      status: "success",
      message: "Campaign added",
      data: {
        hello: "world",
      },
    },
    200
  );
});
