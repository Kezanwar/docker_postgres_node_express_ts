import User, { TUserClient } from "@app/models/user";
import Err from "@app/services/error";
import { ErrResp, ReqBody, ResBody } from "../types";

type CreateUserPostData = {
  first_name: string;
  last_name: string;
  email: string;
};

const UsersController = {
  getAll: async (
    _: ReqBody<undefined>,
    res: ResBody<TUserClient[] | ErrResp>
  ) => {
    try {
      const users = await User.getAll();

      res.json(users);
    } catch (error) {
      Err.send(error, res);
    }
  },
  create: async (
    req: ReqBody<CreateUserPostData>,
    res: ResBody<TUserClient | ErrResp>
  ) => {
    try {
      const { email, first_name, last_name } = req.body;
      const user = await User.create({
        email,
        first_name,
        last_name,
        auth_method: "jwt",
        password: "password123",
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

export default UsersController;
