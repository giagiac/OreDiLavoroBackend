import { ApiProperty } from '@nestjs/swagger';

export class OrdCliTras {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  DOC_ID: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  NOTE_DEST_MERCE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  TEL_DEST_MERCE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  STATO_DEST_MERCE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  PROVINCIA_DEST_MERCE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  CAP_DEST_MERCE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COMUNE_DEST_MERCE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  INDI_DEST_MERCE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  DES_DEST_MERCE?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  NUM_DEST: number;
}
