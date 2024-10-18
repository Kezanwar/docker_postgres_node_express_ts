import { Request, Response } from "express";
import User, { TUserClient } from "@app/models/user";
import Err, { ErrResp } from "@app/services/error";

type CreateUserPostData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

type DeleteUserResponse = {
  message: string;
};

const UsersController = {
  getAll: async (_: Request, res: Response<TUserClient[] | ErrResp>) => {
    try {
      const users = await User.getUsers();
      res.json(users);
    } catch (error) {
      Err.send(error, res);
    }
  },
  get: async (
    req: Request<{ uuid: string }>,
    res: Response<TUserClient | ErrResp>
  ) => {
    try {
      const user = await User.getUserByUUID(req.params.uuid);
      if (!user) {
        Err.throw("Couldn't find user", 404);
      }
      res.json(user);
    } catch (error) {
      Err.send(error, res);
    }
  },
  create: async (
    req: Request<{}, {}, CreateUserPostData>,
    res: Response<TUserClient | ErrResp>
  ) => {
    try {
      const { email, first_name, last_name, password } = req.body;
      const exists = await User.doesUserAlreadyExist(email);
      if (exists) {
        Err.throw("A user already exists with this email", 401);
      }
      const user = await User.create({
        email,
        first_name,
        last_name,
        auth_method: "jwt",
        password,
      });
      if (!user) {
        Err.throw("Error creating user", 500);
      }
      res.json(user.toClient());
    } catch (error) {
      Err.send(error, res);
    }
  },
  delete: async (
    req: Request<{ uuid: string }>,
    res: Response<DeleteUserResponse | ErrResp>
  ) => {
    try {
      const user = await User.deleteByUUID(req.params.uuid);
      if (!user) {
        Err.throw("Couldn't find user to delete", 401);
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      Err.send(error, res);
    }
  },
};

export default UsersController;
