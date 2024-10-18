import express from "express";
import UsersController from "@app/controllers/user";

const UserRouter = express.Router();

UserRouter.get("/list", UsersController.getAll);
UserRouter.get("/manage/:uuid", UsersController.get);
UserRouter.delete("/manage/:uuid", UsersController.delete);

export default UserRouter;
