import { ApiProperty } from '@nestjs/swagger';
import { ArtAnaEntity } from '../../art-ana/infrastructure/persistence/relational/entities/art-ana.entity';

export class EpsNestjsTargaMezzi {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  COD_ART: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  artAna: ArtAnaEntity | null;
}
