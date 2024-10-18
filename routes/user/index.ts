import express from "express";
import UserControllers from "@app/controllers/user";

const UserRouter = express.Router();

UserRouter.get("/list", UserControllers.getAll);
UserRouter.get("/manage/:uuid", UserControllers.get);
UserRouter.delete("/manage/:uuid", UserControllers.delete);

export default UserRouter;
