import { TProduct } from "@/lib/db/schema";
import { z } from "zod";

export const productResponseSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  img_url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  id: z.string(),
});