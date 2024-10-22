import express from "express";
import AuthValidation from "@app/validation/auth";
import AuthControllers from "@app/controllers/auth";
import validate from "@app/middleware/validate";
import auth from "@app/middleware/auth";

const AuthRouter = express.Router();

/** @public /api/auth/register */
/** @desc registers a @user returns @user & @jwt */
AuthRouter.post(
  "/register",
  validate(AuthValidation.registerSchema),
  AuthControllers.register
);

/** @private /api/auth/otp/<@code> */
/** @desc confirms users email via @otp */
AuthRouter.post("/otp/:code", auth, AuthControllers.validateOTP);

/** @public /api/auth/login */
/** @desc logins a @user returns @user & @jwt */
AuthRouter.post(
  "/login",
  validate(AuthValidation.loginSchema),
  AuthControllers.login
);

/** @private /api/auth/initialize */
/** @desc validates a user session with @jwt returns @user */
AuthRouter.post("/initialize", auth, AuthControllers.initialize);

export default AuthRouter;
