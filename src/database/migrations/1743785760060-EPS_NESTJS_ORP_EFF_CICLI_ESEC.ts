import { MigrationInterface, QueryRunner } from "typeorm";

export class EPSNESTJSORPEFFCICLIESEC1743785760060 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE EPS_NESTJS_ORP_EFF_CICLI_ESEC ADD TIPO_TRASFERTA VARCHAR2(50)`,
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE EPS_NESTJS_ORP_EFF_CICLI_ESEC DROP COLUMN TIPO_TRASFERTA`);
      }

}
