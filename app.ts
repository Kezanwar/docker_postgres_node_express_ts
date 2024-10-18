import express, { Response } from "express";
import morganBody from "morgan-body";
import Routes from "@app/routes";
import { connectDB } from "@app/services/db";
import { PORT } from "./config";

/** @services */
await connectDB();

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
