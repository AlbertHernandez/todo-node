export type Env = {
  development: boolean;
  test: boolean;
  beta: boolean;
  production: boolean;
  mongo: {
    url: string;
  };
  port: number;
  apiKey: string;
};
