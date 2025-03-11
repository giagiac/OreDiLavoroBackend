import { ApiProperty } from '@nestjs/swagger';

export class art_ana {
  @ApiProperty({
    type: String,
  })
  COD_ART: string;

  @ApiProperty({
    type: String,
  })
  DES_ART: string;

  @ApiProperty({
    type: String,
  })
  COD_CAT: string;
}
