import express from "express";
import AuthValidation from "@app/validation/auth";
import AuthController from "@app/controllers/auth";
import validate from "@app/middleware/validate";
import auth from "@app/middleware/auth";

const AuthRouter = express.Router();

/** @public */
/** @endpoint /api/auth/registers */
/** @desc registers a new @user */
AuthRouter.post(
  "/register",
  validate(AuthValidation.registerSchema),
  AuthController.register
);

/** @private */
/** @endpoint /api/auth/otp/<@code> */
/** @desc confirms users email via @otp */
AuthRouter.post("/otp/:code", auth, AuthController.validateOTP);

// AuthRouter.get("/otp", auth, AuthController.validateOTP);
// AuthRouter.post("/login", AuthController.register);
// AuthRouter.post("/initialize", AuthController.register);

export default AuthRouter;
