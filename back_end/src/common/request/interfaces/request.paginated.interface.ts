import { EntityManager, FindManyOptions } from "typeorm";

export interface IPaginatedRequest<T> {
  entityManager?: EntityManager;
  options?: FindManyOptions<T>;
  withDeleted?: boolean;
}
