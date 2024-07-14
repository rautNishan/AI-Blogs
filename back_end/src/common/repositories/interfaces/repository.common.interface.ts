import { IFindByIdOptions } from "../../../database/interfaces/database.interfaces";

export interface ICommonRepository<T> {
  findOneOrFail(id: number, options?: IFindByIdOptions<T>): Promise<T>;
}
