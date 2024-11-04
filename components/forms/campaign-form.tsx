"use client";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { z } from "zod";


// use to parse date and date manipulation
dayjs.extend(customParseFormat);

export const FormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  type: z.string().nonempty("Type is required")
});
