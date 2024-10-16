import { ReqBody, ResBody } from "@app/types/controller";
import { CreatePersonPostData, Person } from "@app/types/person";

const PersonControllers = {
  create: (req: ReqBody<CreatePersonPostData>, res: ResBody<Person>) => {
    const { name, job } = req.body;
    try {
      res.json({ createdAt: 1, job, name });
    } catch (error) {}
  },
};

export default PersonControllers;
