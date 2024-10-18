import { Request, Response } from "express";
import User, { TUserClient } from "@app/models/user";
import Err, { ErrResp } from "@app/services/error";
import Auth from "@app/services/auth";

type RegisterPostData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const AuthControllers = {
  register: async (
    req: Request<{}, {}, RegisterPostData>,
    res: Response<TUserClient | ErrResp>
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
      res.json(user.toClient());
    } catch (error) {
      Err.send(error, res);
    }
  },
};

export default AuthControllers;
