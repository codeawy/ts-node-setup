import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z
    .string()
    .transform((value) => parseInt(value, 10))
    .default("5000"),
  // Email configuration (optional in development, required in production)
  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z.string().optional(),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASS: z.string().optional(),
  EMAIL_SECURE: z.string().optional(),
  VERIFICATION_TOKEN_EXPIRES: z.string().default("24")
});

type EnvSchema = z.infer<typeof envSchema>;

let env: EnvSchema;

export function validateEnv(): EnvSchema {
  try {
    env = envSchema.parse(process.env);
    return env;
  } catch (error: any) {
    console.error("Invalid env variables", error.errors);
    process.exit();
  }
}

export function getEnv(): EnvSchema {
  if (!env) {
    return validateEnv();
  }

  return env;
}
