import { DeepPartial, Repository } from "typeorm";
import {
  IBaseRepository,
  ICreateOptions,
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

  
}
