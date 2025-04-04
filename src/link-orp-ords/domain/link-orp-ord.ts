import { OrdCliRighe } from '../../ord-cli-righes/domain/ord-cli-righe';
import { OrdCliTras } from '../../ord-cli-tras/domain/ord-cli-tras';
import { OrpEffCicli } from '../../orp-eff-ciclis/domain/orp-eff-cicli';
import { ApiProperty } from '@nestjs/swagger';

export class LinkOrpOrd {
  @ApiProperty({
    type: () => OrdCliRighe,
    nullable: true,
  })
  ordCliRighe?: OrdCliRighe | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  ORP_EFF_DOC_ID: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  ORD_CLI_DOC_RIGA_ID: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  LINK_ORP_ORD_ID: string;

  @ApiProperty({
    type: () => OrpEffCicli,
    nullable: true,
  })
  orpEffCicli?: OrpEffCicli;
}
