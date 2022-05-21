import jwt from "jsonwebtoken";

export const verifyACToken = (token: any) => {
  let user: any = null;
  try {
    user = jwt.verify(token, process.env.ACSECRECT!);
  } catch (error) {
    console.log(error);
    return (user = null);
  }

  return user;
};

export const verifyRFToken = (token: any) => {
  let user: any = null;
  try {
    user = jwt.verify(token, process.env.RFSECRECT!);
  } catch (error) {
    return (user = null);
  }

  return user;
};
