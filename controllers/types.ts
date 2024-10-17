import { Request, Response } from "express";

export interface ReqBody<T> extends Request {
  body: T;
}

export type ErrResp = {
  message: string;
  code: number;
};

export interface ResBody<T> extends Response<T> {}
