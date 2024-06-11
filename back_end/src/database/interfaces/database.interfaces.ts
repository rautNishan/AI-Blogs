import { DeepPartial, EntityManager } from "typeorm";

//Base Repository Interface
export interface IBaseRepository<T> {
  create(createData: DeepPartial<T>, options?: ICreateOptions): Promise<T>;
//   update(data: DeepPartial<T>, options?: any): Promise<T>;
//   getById(id: number, options?: any): Promise<T>;
//   getOne(query: any, options?: any): Promise<T>;
//   softDelete(id: number, options?: any): Promise<T>;
//   restore(id: number, options?: any): Promise<T>;
//   hardDelete(id: number, options?: any): Promise<T>;
}

export interface ICreateOptions {
  data?: any;
  listeners?: boolean;
  transaction?: boolean;
  entityManager: EntityManager;
}
