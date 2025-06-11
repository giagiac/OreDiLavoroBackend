import { ApiProperty } from '@nestjs/swagger';
import { EpsNestjsOrpEffCicliEsec } from '../../eps-nestjs-orp-eff-cicli-esecs/domain/eps-nestjs-orp-eff-cicli-esec';
import { User } from '../../users/domain/user';

export class Operatori {
  @ApiProperty({
    type: String,
  })
  COD_OP: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  NOME_OP?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  AZIENDA_ID?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  X_COD_BADGE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  UTENTE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_PALMARE?: string | null;

  @ApiProperty({
    type: () => EpsNestjsOrpEffCicliEsec,
    nullable: true,
  })
  epsNestjsOrpEffCicliEsec?: Array<EpsNestjsOrpEffCicliEsec> | null;

  @ApiProperty({
    type: () => User,
    nullable: true,
  })
  user?: User | null;
}
