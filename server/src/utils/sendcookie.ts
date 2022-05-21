import { Response } from "express";

export const sendCookie = (res: Response, token: string) => {
  res.cookie("_plAu", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 5,
  });
};
