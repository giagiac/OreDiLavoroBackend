import { OrdCliRighe } from '../../ord-cli-righes/domain/ord-cli-righe';
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
    type: () => OrpEffCicli,
    nullable: false,
  })
  linkOrpOrd?: OrpEffCicli;
}
