import { ApiProperty } from '@nestjs/swagger';
import { X1TrasCodici } from '../../x1-tras-codicis/domain/x1-tras-codici';

export class OrpEff {
  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  DATA_DOC: Date;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  SERIE_DOC: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  NUM_DOC: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  ANNO_DOC: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  DOC_ID: string;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  AZIENDA_ID?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  DES_PROD?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  COD_ART?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  STATUS?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  SOSPESO?: number | null;

  @ApiProperty({
    type: () => X1TrasCodici,
    nullable: true,
  })
  x1TrasCodici?: X1TrasCodici | null;
}
