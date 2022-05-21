import { Request, Response } from "express";

export type myCtx = {
  req: Request;
  res: Response;
  payload?: any;
};
