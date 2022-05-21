import jwt from "jsonwebtoken";

export const createRefreshToken = (id: string, tkv: number) => {
  const token = jwt.sign(
    { id: id, tkv: tkv },
    process.env.RFSECRECT!.toString(),
    {
      expiresIn: "5d",
    }
  );

  return token;
};

export const createAccessToken = (id: string) => {
  const token = jwt.sign({ id: id }, process.env.ACSECRECT!.toString(), {
    expiresIn: "5h",
  });

  return token;
};
