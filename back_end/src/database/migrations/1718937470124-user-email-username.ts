import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEmailUsername1718937470124 implements MigrationInterface {
  name = "UserEmailUsername1718937470124";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character varying(250)`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "user_name" character varying(250) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_name"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
  }
}
