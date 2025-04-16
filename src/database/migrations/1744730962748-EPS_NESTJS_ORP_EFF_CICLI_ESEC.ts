import { MigrationInterface, QueryRunner } from 'typeorm';

export class EPSNESTJSORPEFFCICLIESEC1744730962748
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE EPS_NESTJS_ORP_EFF_CICLI_ESEC ADD KM NUMBER(11,3)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE EPS_NESTJS_ORP_EFF_CICLI_ESEC DROP COLUMN KM`,
    );
  }
}
