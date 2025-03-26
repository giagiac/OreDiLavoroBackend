import { ApiProperty } from '@nestjs/swagger';

export class OrdCliRighe {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  DES_RIGA?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_ART?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_CF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  DOC_RIGA_ID: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  NUM_RIGA: number;

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
}
