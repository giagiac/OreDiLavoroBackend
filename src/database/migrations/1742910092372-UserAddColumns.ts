import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAddColumns1742910092372 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE EPS_NESTJS_USER ADD COD_OP VARCHAR2(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE EPS_NESTJS_USER DROP COLUMN COD_OP`);
  }
}
