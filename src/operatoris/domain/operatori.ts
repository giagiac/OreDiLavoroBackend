import { ApiProperty } from '@nestjs/swagger';

export class Operatori {
  @ApiProperty({
    type: String,
  })
  COD_OP: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  NOME_OP?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  AZIENDA_ID?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  X_COD_BADGE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  UTENTE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_PALMARE?: string | null;
}
