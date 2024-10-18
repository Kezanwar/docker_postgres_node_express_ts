import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "yup";
import { APIError } from "@app/services/error/index.js";

const validate =
  (schema: ObjectSchema<{ [key: string]: any }>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { abortEarly: false }
      );
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(403).json({ type: error.name, message: error.errors });
        return;
      }
      if (error instanceof Error) {
        res.status(500).json(new APIError(error.message, 500).json_response);
        return;
      }
      res
        .status(500)
        .json(
          new APIError("Sorry, an unexpected error occured", 500).json_response
        );
    }
  };

export default validate;
