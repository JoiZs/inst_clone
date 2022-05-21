import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Insu } from "../entities/insu";
import AuthRepo from "../repo/authrepo";
import argon2 from "argon2";
import { emailVal, passwordVal } from "../utils/validateinp";
import { myCtx } from "../types";
import { isAuth } from "../middlewares/isauth";
import { Resp } from "./resp";
import { createAccessToken, createRefreshToken } from "../utils/tokenreso";
import { sendCookie } from "../utils/sendcookie";

@InputType()
class regInp {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  fullname!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}

@InputType()
class loginInp {
  @Field(() => String)
  cred!: string;

  @Field(() => String)
  password!: string;
}

@Resolver()
export class AuthResolver {
  @Query(() => Insu)
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: myCtx) {
    const { id: userid } = payload;
    return await AuthRepo.findOne({
      where: { userid: userid },
      relations: {
        posts: true,
      },
    });
  }

  @Query(() => Insu)
  @UseMiddleware(isAuth)
  async auser(@Arg("username") username: string) {
    const user = await AuthRepo.findOne({
      where: { username: username },
      relations: {
        posts: true,
      },
    });
    return user;
  }

  @Mutation(() => Resp)
  async login(
    @Arg("loginInp") loginInp: loginInp,
    @Ctx() { res }: myCtx
  ): Promise<Resp> {
    if (!passwordVal(loginInp.password)) {
      return {
        error: {
          type: "Password",
          message:
            "Min 8 length, at least a special character, upper case and lower case letter, and a number",
        },
      };
    }

    const userCheck = await AuthRepo.findOne({
      where: [{ email: loginInp.cred }, { username: loginInp.cred }],
    });

    if (!userCheck)
      return {
        error: { type: "Credential", message: "You must register first." },
      };

    const orgpw = await argon2.verify(userCheck.password, loginInp.password, {
      hashLength: 32,
    });

    if (!orgpw)
      return { error: { type: "Password", message: "Incorrect password" } };

    try {
      const rfToken = createRefreshToken(
        userCheck.userid,
        userCheck.tokenVersion
      );

      sendCookie(res, rfToken);
    } catch (error) {
      console.log(error);
      return {
        error: { type: "Credential", message: "You must register first." },
      };
    }

    return {
      data: {
        type: "AccessToken",
        message: `${createAccessToken(userCheck.userid)}`,
      },
    };
  }

  @Mutation(() => Resp)
  @UseMiddleware(isAuth)
  async revokerft(@Arg("id") id: string): Promise<Resp> {
    const user = AuthRepo.findOne({ where: { userid: id } });
    if (!user)
      return {
        error: {
          type: "ID",
          message: "Invalid UserID",
        },
      };
    await AuthRepo.increment({ userid: id }, "tokenVersion", 1);

    return {
      data: {
        type: "Token Rf",
        message: "Successful",
      },
    };
  }

  @Mutation(() => Resp)
  async register(@Arg("reginp") regInp: regInp): Promise<Resp> {
    if (!emailVal(regInp.email)) {
      return {
        error: {
          type: "Email",
          message: "Not a valid email address",
        },
      };
    }

    if (!passwordVal(regInp.password)) {
      return {
        error: {
          type: "Password",
          message:
            "Min 8 length, at least a special character, an upper case and lower case letter, and a number",
        },
      };
    }

    const mailCheck = await AuthRepo.findOne({
      where: { email: regInp.email },
    });
    if (mailCheck)
      return { error: { type: "Email", message: "User already exists" } };

    const unCheck = await AuthRepo.findOne({
      where: { username: regInp.username },
    });

    if (unCheck)
      return {
        error: { type: "Username", message: "Username already exists" },
      };

    const hashedpw = await argon2.hash(regInp.password, {
      hashLength: 32,
    });

    const createUser = await AuthRepo.save({
      username: regInp.username,
      fullname: regInp.fullname,
      email: regInp.email,
      password: hashedpw,
    });

    return {
      data: {
        type: "Account Registration",
        message: `Successfully registered ${createUser.username}`,
      },
    };
  }

  @Mutation(() => Resp)
  @UseMiddleware(isAuth)
  async logout(@Ctx() { res }: myCtx): Promise<Resp> {
    try {
      res.clearCookie("_plAu");
    } catch (error) {
      console.log(error);
      return {
        error: {
          type: "Log Out",
          message: "You can't logout now",
        },
      };
    }

    return {
      data: {
        type: "Log Out",
        message: "Successfully Logout!",
      },
    };
  }
}
