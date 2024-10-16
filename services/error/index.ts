import { ErrResp, ResBody } from "@app/types/controller";

class APIError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }

  get response(): ErrResp {
    return { message: this.message, code: this.code };
  }
}

class Err {
  static genericErrMsg = "Sorry, an unexpected error occured";

  /* throws an api error to be consumed */
  static throw(message: string, code: number) {
    throw new APIError(message, code);
  }

  /* sends an api error */
  static send(error: unknown, res: ResBody<ErrResp>) {
    this.errorHandler(error, (err) => {
      res.statusCode = err.code;
      res.json(err.response);
    });
  }

  /* narrows unknown error to an api error */
  static errorHandler(
    error: unknown,
    handleError: (errorObj: APIError) => void
  ): void {
    if (error instanceof APIError) {
      handleError(error);
      return;
    }
    if (error instanceof Error) {
      handleError(new APIError(error.message || this.genericErrMsg, 500));
      return;
    }
    if (typeof error === "string") {
      handleError(new APIError(error || this.genericErrMsg, 500));
      return;
    }
    handleError(new APIError(this.genericErrMsg, 500));
  }
}

export default Err;
