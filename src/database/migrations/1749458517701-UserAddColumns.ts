import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddColumns1749458517701 implements MigrationInterface {
    name = 'UserAddColumns1749458517701'

      public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE EPS_NESTJS_USER ADD CF_ORIGIN_DEFAULT VARCHAR2(12 BYTE)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE EPS_NESTJS_USER DROP COLUMN CF_ORIGIN_DEFAULT`);
  }

}
