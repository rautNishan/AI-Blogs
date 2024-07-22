import { AfterLoad, Column, Entity, Index } from "typeorm";
import { FILE_ASSOCIATED_TYPE } from "../../../common/file/constants/file.constants";
import { DataBaseBaseEntity } from "../../../database/base/entity/base.entity";
import { IFile } from "../interfaces/file.interface";

export const FILE_ENTITY_NAME = "files";
@Entity({ name: FILE_ENTITY_NAME })
export class FileEntity extends DataBaseBaseEntity implements IFile {
  @Column({
    type: "varchar",
    name: "path",
    length: 250,
    nullable: false,
  })
  path: string;

  @Index()
  @Column({
    type: "varchar",
    name: "file_name",
    length: 250,
    nullable: false,
  })
  fileName: string;

  @Column({
    type: "varchar",
    name: "mime",
    length: 100,
    nullable: false,
  })
  mime: string;

  @Column({
    type: "numeric",
    name: "size",
    nullable: true,
  })
  size: number;

  @Column({
    type: "text",
    name: "description",
    nullable: true,
  })
  description: string | null;

  @Column({
    type: "bigint",
    name: "association_id",
    nullable: true,
  })
  associationId: number | null;

  @Column({
    type: "enum",
    name: "associated_type",
    enum: FILE_ASSOCIATED_TYPE,
    nullable: true,
  })
  associatedType: FILE_ASSOCIATED_TYPE | null;
}
