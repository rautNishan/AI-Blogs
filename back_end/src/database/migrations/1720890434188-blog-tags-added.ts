import { MigrationInterface, QueryRunner } from "typeorm";

export class BlogTagsAdded1720890434188 implements MigrationInterface {
  name = "BlogTagsAdded1720890434188";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blogs" ADD "tags" text array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "tags"`);
  }
}
