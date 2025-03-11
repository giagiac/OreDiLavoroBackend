import { ApiProperty } from '@nestjs/swagger';
import { TipoCosto } from '../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';
import { CfCommEntity } from '../../cf-comm/infrastructure/persistence/relational/entities/cf-comm.entity';

export class ArticoliCostiCfComm {
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
  CF_COMM_ID: string;

  @ApiProperty({
    type: () => CfCommEntity,
  })
  CfComm?: CfCommEntity | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
