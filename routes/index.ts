import express from "express";
import UserRouter from "./user";
import AuthRouter from "./auth";

const Routes = express.Router();

Routes.use("/user", UserRouter);
Routes.use("/auth", AuthRouter);

export default Routes;
