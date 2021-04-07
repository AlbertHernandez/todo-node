import dotenv from "dotenv";

dotenv.config();

// You may use this as a boolean value for different situations
const env = {
  development: process.env.NODE_ENV === "development",
  test: process.env.NODE_ENV === "test",
  staging: process.env.NODE_ENV === "staging",
  production: process.env.NODE_ENV === "production",
  mongo: {
    url: process.env.MONGO_URI,
  },
  port: Number(process.env.PORT) || 3000,
};

export { env };
