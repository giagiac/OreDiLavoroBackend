import { MigrationInterface, QueryRunner } from 'typeorm';

export class EPSNESTJSORPEFFCICLIESEC1742805328904
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE EPS_NESTJS_ORP_EFF_CICLI_ESEC ADD SYNCED NUMBER(3,0)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE EPS_NESTJS_ORP_EFF_CICLI_ESEC DROP COLUMN SYNCED`,
    );
  }
}
