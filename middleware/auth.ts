import { NextFunction, Request, Response } from "express";
import Err from "@app/services/error";
import Auth from "@app/services/auth";
import User from "@app/models/user";

export type AuthResponse<T> = Response<T, { user: User }>;

const auth = async (
  req: Request,
  res: AuthResponse<{}>,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");

  console.log("token", token);

  try {
    if (!token) {
      Err.throw("No token, authorization denied", 403);
    }
    // verify token
    const decoded = Auth.jwtVerify<{ uuid: string }>(token);

    if (!decoded) {
      Err.throw("token not valid", 403);
    }

    const userFromDB = await User.getUserByUUID(decoded.uuid);

    if (!userFromDB) {
      Err.throw("user not found", 403);
    }

    res.locals.user = new User(userFromDB);

    //  call next to continue to the next middleware with the new validated user in req object
    next();
  } catch (err) {
    // if token is invalid or expired
    Err.send(err, res);
  }
};

export default auth;
