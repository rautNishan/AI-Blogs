import { IFindByIdOptions } from "../../../database/interfaces/database.interfaces";

export interface ICommonRepository<T> {
  findOneOrFailById(id: number, options?: IFindByIdOptions<T>): Promise<T>;
}
