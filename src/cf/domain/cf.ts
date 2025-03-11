import { ApiProperty } from '@nestjs/swagger';
import { CfComm } from '../../cf-comm/domain/cf-comm';
import { ArticoliCostiCf } from '../../articoli-costi-cf/domain/articoli-costi-cf';

export class Cf {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_FISC_CF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  P_IVA_CF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  RAG_SOC_CF_INT?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  RAG_SOC_CF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  COD_CF: string;

  @ApiProperty({
    type: () => Array<CfComm | null>,
  })
  cfComm?: CfComm[] | null;

  @ApiProperty({
    type: () => Array<ArticoliCostiCf | null>,
  })
  articoliCostiCf?: ArticoliCostiCf[] | null;
}
