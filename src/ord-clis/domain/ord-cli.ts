import { ApiProperty } from '@nestjs/swagger';
import { CfComm } from '../../cf-comms/domain/cf-comm';

export class OrdCli {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  NUM_SEDE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_CF?: string | null;

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
    type: () => CfComm,
  })
  cfComm?: CfComm | null;
}
