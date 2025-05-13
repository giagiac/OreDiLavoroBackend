import { ApiProperty } from '@nestjs/swagger';
import { ArticoliCostiCfComm } from '../../articoli-costi-cf-comm/domain/articoli-costi-cf-comm';

export class CfComm {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  NOTE_SEDE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  RIFERIMENTO_SEDE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  E_MAIL_SEDE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  FAX_SEDE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  TEL_SEDE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  INDI_SEDE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  CAP_SEDE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COMUNE_SEDE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  PROVINCIA_SEDE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  X_ZONA?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  CF_COMM_ID: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  COD_CF: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  DES_SEDE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  NUM_SEDE: string;

  @ApiProperty({
    type: () => Array<ArticoliCostiCfComm>,
    nullable: true,
  })
  articoliCostiCfComm: Array<ArticoliCostiCfComm> | null;
}
