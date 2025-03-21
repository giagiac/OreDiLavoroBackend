import { ApiProperty } from '@nestjs/swagger';

export class ArtCosti {
  @ApiProperty({
    type: String,
  })
  COD_ART_TIPO_COST: string;

  @ApiProperty({
    type: String,
  })
  COD_ART;

  @ApiProperty({
    type: String,
  })
  COD_TIPO_COST;

  @ApiProperty({
    type: String,
  })
  COSTO_ART;

  @ApiProperty({
    type: Date,
  })
  DATA_RIF: Date;
}
