import { ApiProperty } from '@nestjs/swagger';
import { TipoCosto } from '../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';
import { CfCommEntity } from '../../cf-comm/infrastructure/persistence/relational/entities/cf-comm.entity';
import { ArtAna } from '../../art-ana/domain/art-ana';

export class ArticoliCostiCfComm {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_ART?: string | null;

  @ApiProperty({
    type: () => String,
    required: true
  })
  TIPO_COSTO?: TipoCosto;

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
