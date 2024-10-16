import express from "express";
import morganBody from "morgan-body";
import DB from "@app/services/db";
import Routes from "@app/routes";
import { ResBody } from "@app/types/controller";

/* start services */
await DB.connect();
await DB.setup();

/* create app */
const PORT = 1337;
const app = express();

/* init middlewares */
app.use(express.json());
morganBody(app, { prettify: true, logIP: false, logReqUserAgent: false });

/* register routes */
app.get("/", (_, res: ResBody<string>) => {
  res.json(`Hello from the app on port ${PORT}`);
});
app.use("/api", Routes);

/* serve app */
app.listen(PORT, () => console.log(`API running on port ${PORT} 🚀`));
