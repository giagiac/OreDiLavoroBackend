import { ApiProperty } from '@nestjs/swagger';
import { ArtCosti } from '../../art-costi/domain/art-costi';

export class ArtAna {
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

  @ApiProperty({
    type: Array<ArtCosti>,
  })
  artCosti?: Array<ArtCosti> | null;
}
