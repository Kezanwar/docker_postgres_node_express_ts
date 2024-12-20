import { Request, Response } from "express";

import Err, { ErrResp } from "@app/services/error";
import User, { TUserClient } from "@app/models/user";

type DeleteUserResponse = {
  message: string;
};

const UserControllers = {
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

export default UserControllers;
