import { ApiProperty } from '@nestjs/swagger';
import { ArtAna } from '../../art-ana/domain/art-ana';
import { TipoTrasferta } from '../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';

export class ArticoliCostiCfComm {
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
  CF_COMM_ID: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    type: () => ArtAna,
  })
  artAna?: ArtAna | null;
}
