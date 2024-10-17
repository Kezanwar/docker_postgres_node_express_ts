import DB from "@app/services/db";
import { QueryResultRow } from "pg";

export class GenericModelMethods {
  static async findByID<T extends QueryResultRow>(
    id: number,
    modelName: string
  ): Promise<T | null> {
    const result = await DB.query<T>(
      `SELECT * FROM ${modelName} WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  static async findByUUID<T extends QueryResultRow>(
    uuid: string,
    modelName: string
  ): Promise<T | null> {
    const result = await DB.query<T>(
      `SELECT * FROM ${modelName} WHERE uuid = $1`,
      [uuid]
    );
    return result.rows[0] || null;
  }

  static async find<T extends QueryResultRow>(
    query: string,
    args: any[],
    modelName: string
  ): Promise<T[] | null> {
    const result = await DB.query<T>(`SELECT * FROM ${modelName} ${query}`, [
      args,
    ]);
    return result.rows || null;
  }
}
