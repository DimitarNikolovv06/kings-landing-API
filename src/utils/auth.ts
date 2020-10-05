import { Request } from "express";

export const getToken = (req: Request): string | null => {
  const auth = req.get("authorization");

  if (auth && auth.toLowerCase().startsWith("bearer")) {
    return auth.substring(7);
  }

  return null;
};
