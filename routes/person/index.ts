import express from "express";
import PersonControllers from "@app/controllers/person";

const PersonRouter = express.Router();

PersonRouter.post("/", PersonControllers.create);
PersonRouter.get("/", PersonControllers.getAll);

export default PersonRouter;
