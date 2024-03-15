import { z } from "zod";
import "dotenv/config";

const dotenvSchema = z.object({
  BACKEND_PORT: z.string().transform((bp) => +bp),
  BACKEND_URL: z.string(),

  POSTGRES_NAME: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PORT: z.string().transform((pp) => +pp),

  REDIS_PORT: z.string().transform((rp) => +rp),
  REDIS_HOST: z.string(),
});
export const dotenv = dotenvSchema.parse(process.env);
