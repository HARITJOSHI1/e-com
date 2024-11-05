import { z } from "zod";

export const queryParamsSchema = z.object({
  page: z.coerce.number().optional().openapi({
    param: {
      name: "page",
      in: "query",
    },
  }),

  count: z.coerce.number().optional().openapi({
    param: {
      name: "count",
      in: "query",
    },
  }),
});

export const pathParamSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
    },
  }),
});
