import PersonDB from "@app/services/db/person";
import Err from "@app/services/error";
import { ErrResp, ReqBody, ResBody } from "@app/types/controller";
import { CreatePersonPostData, Person } from "@app/types/person";

const PersonControllers = {
  getAll: async (_: ReqBody<undefined>, res: ResBody<Person[] | ErrResp>) => {
    try {
      const persons = await PersonDB.getAll();
      res.json(persons.rows);
    } catch (error) {
      Err.send(error, res);
    }
  },
  create: async (
    req: ReqBody<CreatePersonPostData>,
    res: ResBody<Person | ErrResp>
  ) => {
    try {
      const person = await PersonDB.create(req.body);
      console.log(person);
      res.json(person.rows[0]);
    } catch (error) {
      Err.send(error, res);
    }
  },
};

export default PersonControllers;
