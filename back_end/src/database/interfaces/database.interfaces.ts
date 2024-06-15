import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  FindOneOptions,
} from "typeorm";

//Base Repository Interface
export interface IBaseRepository<T> {
  create(createData: DeepPartial<T>, options?: ICreateOptions): Promise<T>;
  update(data: DeepPartial<T>, options?: IUpdateOptions): Promise<T>;
  getById(id: number, options?: any): Promise<T | null>;
  getOne(options?: IFindOneOption<T>): Promise<T | null>;
  softDelete(entity: T, options?: IOnlyEntityManager): Promise<T>;
  restore(entity: T, options?: IOnlyEntityManager): Promise<T>;
  hardDelete(entity: T, options?: IOnlyEntityManager): Promise<DeleteResult>;
}

export interface ICreateOptions {
  data?: any;
  listeners?: boolean;
  transaction?: boolean;
  entityManager: EntityManager;
}

export interface IUpdateOptions {
  entityManager: EntityManager;
}

export interface IFindByIdOptions<T> {
  entityManager?: EntityManager;
  options?: FindOneOptions<T>;
  withDeleted?: boolean;
}

export interface IFindOneOption<T> {
  entityManager?: EntityManager;
  options?: FindOneOptions<T>;
  withDeleted?: boolean;
}

export interface ISoftDelete {
  entityManage?: EntityManager;
}

export interface IRestore {
  entityManage?: EntityManager;
}

export interface IOnlyEntityManager {
  entityManage?: EntityManager;
}
