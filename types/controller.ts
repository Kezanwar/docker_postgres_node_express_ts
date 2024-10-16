import { Request, Response } from "express";

export interface ReqBody<T> extends Request {
  body: T;
}

export interface ResBody<T> extends Response<T> {}
