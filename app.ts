import express from "express";
import morganBody from "morgan-body";
import { connectDB } from "@app/services/db";
import Routes from "@app/routes";
import { ResBody } from "@app/types/controller";
import User from "./models/user";

/* start services */
await connectDB();

/* create app */
const PORT = 1337;
const app = express();

/* init middlewares */
app.use(express.json());
morganBody(app, { prettify: true, logIP: false, logReqUserAgent: false });

/* register routes */
app.get("/", (_, res: ResBody<string>) => {
  res.json(`Hello from the app on s port ${PORT}`);
});
app.use("/api", Routes);

/* serve app */
app.listen(PORT, () => console.log(`API running on port ${PORT} 🚀`));

// const u = await User.create({
//   auth_method: "jwt",
//   email: "kezanwar@gmail.com",
//   first_name: "Kez",
//   last_name: "Anwar",
// });

// console.log(u);

// console.log(u);
