import express from "express";
import PersonRouter from "./user";

const Routes = express.Router();

Routes.use("/user", PersonRouter);

export default Routes;
