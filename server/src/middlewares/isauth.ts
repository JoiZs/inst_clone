import { MiddlewareFn } from "type-graphql";
import { myCtx } from "../types";
import { verifyACToken } from "../utils/tokenveri";

export const isAuth: MiddlewareFn<myCtx> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) throw new Error("Not Authenticated");
  try {
    const acToken = authorization?.split(" ")[1];
    const user = verifyACToken(acToken);
    if (!user) throw new Error("Not Authenticated");
    context.payload = user;
  } catch (error) {
    throw new Error("Not Authenticated");
  }

  return next();
};
