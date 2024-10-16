import express from "express";
import DB from "@app/services/db";
import { ReqBody, ResBody } from "@app/types/handlers";

const PORT = 1337;

const app = express();

app.use(express.json());

// await DB.connect();

app.get("/", (_, res) => {
  res.json(`Hello from the API on port ${PORT}`);
});

type TestPostBodyData = {
  name: string;
  job: string;
};

app.post("/", (req: ReqBody<TestPostBodyData>, res: ResBody<string>) => {
  const { job, name } = req.body;
  res.json(`Hello ${name} - ${job}`);
});

app.listen(PORT, () => console.log(`API running on port ${PORT} 🚀`));
