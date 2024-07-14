import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { DataBaseBaseEntity } from "../../../database/base/entity/base.entity";
import { IBlog } from "../interfaces/blog.interface";
import { UserEntity } from "../../users/entities/user.entity";
import { text } from "stream/consumers";

export const BLOG_DATABASE_NAME = "blogs";

@Entity({ name: BLOG_DATABASE_NAME })
export class BlogEntity extends DataBaseBaseEntity implements IBlog {
  @Column({
    name: "title",
    type: "varchar",
    length: 250,
  })
  title: string;

  @Column({
    name: "sub-title",
    type: "varchar",
    length: 250,
  })
  subTitle: string;

  @Column({
    name: "description",
    type: "text",
  })
  description: string;

  @Column({
    name: "tags",
    nullable: true,
    type: "text",
    array: true,
  })
  tags: string[];

  @Column({
    name: "user_id",
    type: "bigint",
  })
  userId: number;

  /*
  Relations
  */
  @ManyToOne(() => UserEntity, (user) => user.blogs)
  @JoinColumn({
    name: "user_id",
  })
  users?: UserEntity;
}
