import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT) || 3000;

const isNodeEnv = (env: string) => process.env.NODE_ENV === env;

const env = {
  development: isNodeEnv("development"),
  test: isNodeEnv("test"),
  beta: isNodeEnv("beta"),
  production: isNodeEnv("production"),
};

const mongo = {
  url: process.env.MONGO_URI,
};

export { port, env, mongo };
