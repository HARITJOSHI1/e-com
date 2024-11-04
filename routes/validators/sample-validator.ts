import { z } from "zod";

export const dummyValidator = z.object({
  rand: z.string({ message: "YOUR ERROR MESSAGES" }),
});
