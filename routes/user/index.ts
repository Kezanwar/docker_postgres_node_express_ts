import express from "express";
import UsersController from "@app/controllers/user";

const UserRouter = express.Router();

UserRouter.post("/", UsersController.create);
UserRouter.get("/", UsersController.getAll);

export default UserRouter;
