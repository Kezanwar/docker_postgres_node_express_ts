import DB from "@app/services/db";
import { QueryResultRow } from "pg";

class Model {
  constructor(augment: any = {}) {
    Object.assign(this, augment);
  }
  static create<T extends typeof Model, U>(this: T, augment?: U) {
    return new this(augment) as InstanceType<T> & U;
  }
}

export class ModelBuilder {
  static generate<T extends QueryResultRow>(modelName: string) {
    return class extends Model {
      static async findByID(id: number): Promise<T | null> {
        const result = await DB.query<T>(
          `SELECT * FROM ${modelName} WHERE id = $1`,
          [id]
        );
        return result.rows[0] || null;
      }

      static async findByUUID(uuid: string): Promise<T | null> {
        const result = await DB.query<T>(
          `SELECT * FROM ${modelName} WHERE uuid = $1`,
          [uuid]
        );
        return result.rows[0] || null;
      }

      static async find(query: string, args: any[]): Promise<T[] | null> {
        const result = await DB.query<T>(
          `SELECT * FROM ${modelName} ${query}`,
          [args]
        );
        return result.rows || null;
      }
    };
  }
}

export default Model;
