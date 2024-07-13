import { MigrationInterface, QueryRunner } from "typeorm";

export class FileInit1720854473609 implements MigrationInterface {
  name = "FileInit1720854473609";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."files_associated_type_enum" AS ENUM('BLOG')`
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "path" character varying(250) NOT NULL, "file_name" character varying(250) NOT NULL, "mime" character varying(100) NOT NULL, "size" numeric, "description" text, "association_id" bigint, "associated_type" "public"."files_associated_type_enum", CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TYPE "public"."files_associated_type_enum"`);
  }
}
