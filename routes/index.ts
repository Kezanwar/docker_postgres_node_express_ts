import express from "express";
import UserRouter from "./user";

const Routes = express.Router();

Routes.use("/user", UserRouter);

export default Routes;
