import { ApiProperty } from '@nestjs/swagger';
import { ArtCosti } from '../../art-costi/domain/art-costi';
import { TipoCosto } from '../infrastructure/persistence/relational/entities/articoli-costi-cf.entity';

export class ArticoliCostiCf {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_ART?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  TIPO_COSTO?: TipoCosto | null;

  @ApiProperty({
    type: String,
  })
  COD_CF: string;

  @ApiProperty({
    type: () => Array<ArtCosti | null>,
  })
  artCosti?: ArtCosti[] | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
