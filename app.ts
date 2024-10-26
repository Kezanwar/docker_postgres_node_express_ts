import express, { Response } from "express";
import morganBody from "morgan-body";
import Routes from "@app/routes";
import { PORT } from "./config";
import { validateConntection } from "./db";

/** @services */
await validateConntection();

/** @app */
const app = express();

/** @middlewares */
app.use(express.json());
morganBody(app, { prettify: true, logIP: false, logReqUserAgent: false });

/** @routes */
app.get("/", (_, res: Response<string>) => {
  res.json(`Hello from the app on port ${PORT}`);
});
app.use("/api", Routes);

/** @serve */
app.listen(PORT, () => console.log(`API running on port ${PORT} 🚀`));
