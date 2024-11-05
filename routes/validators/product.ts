import { z } from "zod";

export const productValidator = z.object({
  rand: z.string({ message: "YOUR ERROR MESSAGES" }),
});
