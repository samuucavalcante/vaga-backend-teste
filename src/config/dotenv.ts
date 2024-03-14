import { z } from "zod";
import "dotenv/config";

const dotenvSchema = z.object({
  BACKEND_PORT: z.string().transform((bp) => +bp),
  BACKEND_URL: z.string(),
});

export const dotenv = dotenvSchema.parse(process.env);
