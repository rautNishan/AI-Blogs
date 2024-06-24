import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRemovedfullname1719041626473 implements MigrationInterface {
  name = "UserRemovedfullname1719041626473";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "full_name" jsonb NOT NULL`
    );
  }
}
