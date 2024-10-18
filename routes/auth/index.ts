import express from "express";
import AuthController from "@app/controllers/auth";
import validate from "@app/middleware/validate";
import AuthValidation from "@app/validation/auth";
import auth from "@app/middleware/auth";

const AuthRouter = express.Router();

/**@public /api/auth/registers - registers a new user */
AuthRouter.post(
  "/register",
  validate(AuthValidation.registerSchema),
  AuthController.register
);

/**@private /api/auth/otp/<code> - confirms users email via OTP */
AuthRouter.post("/otp/:code", auth, AuthController.validateOTP);

// AuthRouter.get("/otp", auth, AuthController.validateOTP);
// AuthRouter.post("/login", AuthController.register);
// AuthRouter.post("/initialize", AuthController.register);

export default AuthRouter;
