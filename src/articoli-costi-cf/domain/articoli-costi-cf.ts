import { ApiProperty } from '@nestjs/swagger';
import { ArtAna } from '../../art-ana/domain/art-ana';
import { TipoTrasferta } from '../infrastructure/persistence/relational/entities/articoli-costi-cf.entity';

export class ArticoliCostiCf {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_ART?: string | null;

  @ApiProperty({
    type: () => String,
    required: true,
  })
  TIPO_TRASFERTA?: TipoTrasferta;

  @ApiProperty({
    type: String,
  })
  COD_CF: string;

  @ApiProperty({
    type: () => ArtAna,
  })
  artAna?: ArtAna | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
