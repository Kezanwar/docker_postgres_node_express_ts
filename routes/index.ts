import express from "express";
import PersonRouter from "./person";

const Routes = express.Router();

Routes.use("/person", PersonRouter);

export default Routes;
