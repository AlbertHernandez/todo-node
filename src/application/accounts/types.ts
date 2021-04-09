export type Account = {
  name: string;
  email: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type AuthenticationRequest = {
  email: string;
  password: string;
};
