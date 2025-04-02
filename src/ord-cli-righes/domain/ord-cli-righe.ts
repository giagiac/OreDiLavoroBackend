import { ApiProperty } from '@nestjs/swagger';
import { Cf } from '../../cf/domain/cf';
import { OrdCliTras } from '../../ord-cli-tras/domain/ord-cli-tras';

export class OrdCliRighe {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  DES_RIGA?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_ART?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_CF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  DOC_RIGA_ID: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  NUM_RIGA: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  DOC_ID: string;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  AZIENDA_ID?: number | null;

  @ApiProperty({
    type: () => Cf,
  })
  cf?: Cf | null;

  @ApiProperty({
    type: () => OrdCliTras,
  })
  ordCliTras?: OrdCliTras | null;
}
