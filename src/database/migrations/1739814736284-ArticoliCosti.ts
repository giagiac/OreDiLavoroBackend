import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArticoliCosti1739814736284 implements MigrationInterface {
  name = 'ArticoliCosti1739814736284';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "EPS_NESTJS_ARTICOLI_COSTI" ("costo2" varchar2(20), "costo1" varchar2(20), "CF_COMM_ID" varchar2(255) NOT NULL, "id" number GENERATED BY DEFAULT AS IDENTITY, "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, CONSTRAINT "PK_00e7b3e138034694c6120a7999c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "EPS_NESTJS_ARTICOLI_COSTI"`);
  }
}
