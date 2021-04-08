import dotenv from "dotenv";

dotenv.config();

const isNodeEnv = (env: string) => process.env.NODE_ENV === env;

export const env = {
  development: isNodeEnv("development"),
  test: isNodeEnv("test"),
  beta: isNodeEnv("beta"),
  production: isNodeEnv("production"),
  mongo: {
    url: process.env.MONGO_URI,
  },
  port: Number(process.env.PORT) || 3000,
};
