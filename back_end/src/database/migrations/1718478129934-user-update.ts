import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUpdate1718478129934 implements MigrationInterface {
  name = "UserUpdate1718478129934";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "full_name" jsonb NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(250) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" character varying(250) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
  }
}
