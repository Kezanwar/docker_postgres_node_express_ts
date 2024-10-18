import express from "express";
import AuthController from "@app/controllers/auth";
import validate from "@app/middleware/validate";
import AuthValidation from "@app/validation/auth";

const AuthRouter = express.Router();

AuthRouter.post(
  "/register",
  validate(AuthValidation.registerSchema),
  AuthController.register
);
AuthRouter.post("/otp/:code", AuthController.register);
AuthRouter.get("/otp", AuthController.register);
AuthRouter.post("/login", AuthController.register);
AuthRouter.post("/initialize", AuthController.register);

export default AuthRouter;
