import { DeepPartial, DeleteResult, FindOneOptions, Repository } from "typeorm";
import {
  IBaseRepository,
  ICreateOptions,
  IFindByIdOptions,
  IFindOneOption,
  IOnlyEntityManager,
  IRestore,
  ISoftDelete,
  IUpdateOptions,
} from "../../interfaces/database.interfaces";
import { DataBaseBaseEntity } from "../entity/base.entity";

export class BaseRepository<T extends DataBaseBaseEntity>
  implements IBaseRepository<T>
{
  private _repo: Repository<T>;

  constructor(repo: Repository<T>) {
    this._repo = repo;
  }

  async create(
    createData: DeepPartial<T>,
    options?: ICreateOptions
  ): Promise<T> {
    let entityInstance: T;

    if (options?.entityManager) {
      //Since this create new entity instance so first we will create new entity instance
      entityInstance = options.entityManager.create(
        this._repo.target, //This is Entity like
        createData
      );
      //Pass this instance to save method which will insert the instance
      return await options.entityManager.save(entityInstance);
    }

    entityInstance = await this._repo.create(createData);
    return this._repo.create(entityInstance);
  }

  async update(
    updateData: DeepPartial<T>,
    options?: IUpdateOptions
  ): Promise<T> {
    if (options?.entityManager) {
      return await options.entityManager.save(this._repo.target, updateData);
    }
    return await this._repo.save(updateData);
  }

  async getById(id: number, options?: IFindByIdOptions<T>): Promise<T | null> {
    const find: any = {
      where: { id },
    };

    if (options?.withDeleted) {
      find.withDeleted = true;
    }

    if (options?.entityManager) {
      return await options.entityManager.findOne(this._repo.target, find);
    }

    return this._repo.findOne(find);
  }

  async getOne(options?: IFindOneOption<T>): Promise<T | null> {
    const find: any = {};

    if (options?.withDeleted) {
      find.withDeleted = true;
    }

    if (options?.options?.where) {
      find.where = options.options.where;
    }

    if (options?.entityManager) {
      return await options.entityManager.findOne(this._repo.target, find);
    }

    return this._repo.findOne(find);
  }

  async softDelete(entity: T, options?: IOnlyEntityManager): Promise<T> {
    entity.deletedAt = new Date();

    if (options?.entityManage) {
      return await options.entityManage.save(this._repo.target, entity);
    }
    return await this._repo.save(entity);
  }

  async restore(entity: T, options?: IOnlyEntityManager): Promise<T> {
    entity.deletedAt = null;
    if (options?.entityManage) {
      return await options.entityManage.save(this._repo.target, entity);
    }
    return await this._repo.save(entity);
  }

  async hardDelete(
    entity: T,
    options?: IOnlyEntityManager
  ): Promise<DeleteResult> {
    if (options?.entityManage) {
      return await options.entityManage.delete(this._repo.target, entity.id);
    }
    return await this._repo.delete(entity.id);
  }
}
