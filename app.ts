import express, { Response } from "express";
import morganBody from "morgan-body";
import Routes from "@app/routes";
import { connectDB } from "@app/services/db";
import { PORT } from "./config";

/* start services */
await connectDB();

/* create app */

const app = express();

/* init middlewares */
app.use(express.json());
morganBody(app, { prettify: true, logIP: false, logReqUserAgent: false });

/* register routes */
app.get("/", (_, res: Response<string>) => {
  res.json(`Hello from the app on s port ${PORT}`);
});
app.use("/api", Routes);

/* serve app */
app.listen(PORT, () => console.log(`API running on port ${PORT} 🚀`));
