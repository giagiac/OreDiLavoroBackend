import { ApiProperty } from '@nestjs/swagger';

export class tipiCostiArt {
  @ApiProperty({
    type: String,
  })
  COD_TIPO_COST: string;

  @ApiProperty({
    type: String,
  })
  DES_TIPO_COST: string

  @ApiProperty({
    type: Number,
  })
  TIPO_COSTO:Number

  // COD_TIPO_COST	NOT NULL	VARCHAR2(12)
  // DES_TIPO_COST		VARCHAR2(255)
  // TIPO_COSTO		NUMBER(3)
  // FORMULA_CALCOLO_COST		VARCHAR2(2000)
  // FLAG_COSTO_CALCOLATO		NUMBER(3)
  // TIPO_CALC		VARCHAR2(20)
  // STATEMENT		VARCHAR2(255)
  // ID_PERC		VARCHAR2(12)
}
