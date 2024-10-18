import { object, string } from "yup";

const AuthValidation = {
  registerSchema: object({
    body: object({
      first_name: string().required(),
      last_name: string().required(),
      email: string().email().required(),
      password: string().min(8).max(32).required(),
    }),
  }),
};

export default AuthValidation;
