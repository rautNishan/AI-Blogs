import { MigrationInterface, QueryRunner } from "typeorm";

export class UserBlogRelations1719817902838 implements MigrationInterface {
  name = "UserBlogRelations1719817902838";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blogs" ADD "user_id" bigint NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ADD CONSTRAINT "FK_57d7c984ba4a3fa3b4ea2fb5553" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blogs" DROP CONSTRAINT "FK_57d7c984ba4a3fa3b4ea2fb5553"`
    );
    await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "user_id"`);
  }
}
