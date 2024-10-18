import { Request, Response } from "express";
import User, { TUserClient } from "@app/models/user";
import Err, { ErrResp } from "@app/services/error";
import Auth, { Token } from "@app/services/auth";
import { AuthResponse } from "@app/middleware/auth";
import { SuccessResp } from "../types";

type RegisterPostData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

type RegisterRespData = {
  user: TUserClient;
  token: Token;
};

const AuthControllers = {
  register: async (
    req: Request<{}, {}, RegisterPostData>,
    res: Response<RegisterRespData | ErrResp>
  ) => {
    try {
      const { email, first_name, last_name, password } = req.body;

      const exists = await User.canUseEmail(email);

      if (exists) {
        Err.throw("A user already exists with this email", 401);
      }

      const hashed_pw = await Auth.hashUserGeneratedPW(password);

      const user = await User.create({
        email,
        first_name,
        last_name,
        auth_method: Auth.jwtAuthMethod,
        password: hashed_pw,
      });

      if (!user) {
        Err.throw("Error creating user", 500);
      }

      const token = Auth.jwtSign30Days({ uuid: user.uuid });

      res.json({ user: user.toClient(), token });
      //TODO: Send an OTP email using an Email Service to the user here
    } catch (error) {
      Err.send(error, res);
    }
  },
  validateOTP: async (
    req: Request<{ code: string }>,
    res: AuthResponse<SuccessResp | ErrResp>
  ) => {
    try {
      if (!req.params.code) {
        Err.throw("Missing OTP in request", 500);
      }
      const user = res.locals.user;
      const matches = user.otp === req.params.code;

      if (!matches) {
        Err.throw("Incorrect OTP", 500);
      }

      user.confirmed_email = true;

      await user.save();

      res.json({ message: "Successfully confirmed your email" });
    } catch (error) {
      Err.send(error, res);
    }
  },
};

export default AuthControllers;
