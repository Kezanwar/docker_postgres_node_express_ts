import DB from "@app/services/db";
import { QueryResultRow } from "pg";

export class GenericModelMethods {
  static async findByID<T extends QueryResultRow>(
    modelName: string,
    id: number
  ): Promise<T | null> {
    const result = await DB.query<T>(
      `SELECT * FROM ${modelName} WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  static async findByUUID<T extends QueryResultRow>(
    modelName: string,
    uuid: string
  ): Promise<T | null> {
    const result = await DB.query<T>(
      `SELECT * FROM ${modelName} WHERE uuid = $1`,
      [uuid]
    );
    return result.rows[0] || null;
  }

  static async find<T extends QueryResultRow>(
    modelName: string,
    query: string,
    args: any[]
  ): Promise<T[] | null> {
    const result = await DB.query<T>(
      `SELECT * FROM ${modelName} ${query || ""}`,
      args
    );
    return result.rows || null;
  }
}
