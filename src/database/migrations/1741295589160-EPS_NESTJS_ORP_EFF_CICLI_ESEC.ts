import { MigrationInterface, QueryRunner } from 'typeorm';

export class EPSNESTJSORPEFFCICLIESEC1741295589160
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            CREATE TABLE EPS_NESTJS_ORP_EFF_CICLI_ESEC(
            "AZIENDA_ID" NUMBER(11,0), 
            "DOC_ID" VARCHAR2(20 BYTE), 
            "NUM_RIGA" NUMBER(11,0), 
            "DOC_RIGA_ID" VARCHAR2(30 BYTE), 
            "ART_CICLI_ID" NUMBER(16,0), 
            "NUM_FASE" NUMBER(3,0), 
            "ART_CICLI_FASI_ID" VARCHAR2(30 BYTE), 
            "NUM_ESEC" NUMBER(11,0), 
            "DOC_RIGA_ESEC_ID" VARCHAR2(35 BYTE), 
            "COD_ART" VARCHAR2(30 BYTE), 
            "COD_CICLO" VARCHAR2(12 BYTE), 
            "COD_CAUS" VARCHAR2(12 BYTE), 
            "COD_CP" VARCHAR2(12 BYTE), 
            "COD_OP" VARCHAR2(12 BYTE), 
            "TEMPO_MACCHINA" FLOAT(126), 
            "TEMPO_OPERATORE" FLOAT(126), 
            "QT_PRODOTTA" FLOAT(126), 
            "SCARTI" FLOAT(126), 
            "DATA_INIZIO" DATE, 
            "DATA_FINE" DATE, 
            "COSTO_ORARIO_MACCH" FLOAT(126), 
            "COSTO_ORARIO_OPE" FLOAT(126), 
            "COSTO_TOT" FLOAT(126), 
            "TIPO_TURNO" VARCHAR2(12 BYTE), 
            "FLAG_COMPLETATO" NUMBER(3,0), 
            "COSTO_MACCH" FLOAT(126), 
            "COSTO_OPE" FLOAT(126), 
            "COSTO_ESTERNO" FLOAT(126), 
            "COD_CENTRO" VARCHAR2(20 BYTE), 
            "FLAG_CHIUDI_ORP" NUMBER(3,0), 
            "X_FLAG_RICAL_TEMPO" NUMBER(3,0), 
            "COD_CENTRO_EFF" VARCHAR2(20 BYTE), 
            "COD_MACCHINA_EFF" VARCHAR2(30 BYTE), 
            "NUM_ADDETTI" NUMBER(16,2), 
            "NOTE" VARCHAR2(1000 BYTE), 
            "TEMPO_MINUTI_MACC" NUMBER(16,0), 
            "TEMPO_MINUTI_OP" NUMBER(16,0), 
            "SCARTI_MP_PRIMA_DE" FLOAT(126), 
            "SCARTI_PF_PRIMA_DE" FLOAT(126), 
            "SCARTI_MP_PRIMA_DI" FLOAT(126), 
            "SCARTI_PF_PRIMA_DI" FLOAT(126), 
            "QUANT_MP_LAVORATA" FLOAT(126), 
            "QUANT_PF_LAVORATO" FLOAT(126), 
            "SCARTI_MP_DOPO_DE" FLOAT(126), 
            "SCARTI_PF_DOPO_DE" FLOAT(126), 
            "SCARTI_MP_DOPO_DI" FLOAT(126), 
            "SCARTI_PF_DOPO_DI" FLOAT(126), 
            "QUANT_PROD_MP" FLOAT(126), 
            "QUANT_PROD_PF" FLOAT(126), 
            "FLAG_NON_CONFORME" NUMBER(3,0), 
            "UTENTE_INS" VARCHAR2(20 BYTE), 
            "TEMPO_IMPRODUTTIVO" FLOAT(126), 
            "NR_VERSAMENTI" NUMBER(11,0), 
            "QT_VERSAMENTI" FLOAT(126), 
            "QT_SCARTI_X_VERS" FLOAT(126), 
            "FLAG_R2_EXT" NUMBER(3,0), 
            "FLAG_R2_ARROT" NUMBER(3,0), 
            "DATA_OR_INIZIO" DATE, 
            "FLAG_M_DIN" NUMBER(3,0), 
            "DATA_OR_FINE" DATE, 
            "FLAG_M_DFI" NUMBER(3,0)
            )
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "EPS_NESTJS_ORP_EFF_CICLI_ESEC"`);
  }
}
