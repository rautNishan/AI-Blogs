import { MigrationInterface, QueryRunner } from "typeorm";

export class FileFileNameIndex1721317684583 implements MigrationInterface {
  name = "FileFileNameIndex1721317684583";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd7dd3bddb0a6ae274744af85" ON "files" ("file_name") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd7dd3bddb0a6ae274744af85"`
    );
  }
}
