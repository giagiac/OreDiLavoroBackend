import { OrdCliRigheDto } from '../../ord-cli-righes/dto/ord-cli-righe.dto';

import { OrpEffCicliDto } from '../../orp-eff-ciclis/dto/orp-eff-cicli.dto';

import {
  // decorators here

  IsString,
  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateLinkOrpOrdDto {
  @ApiProperty({
    required: false,
    type: () => OrdCliRigheDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrdCliRigheDto)
  @IsNotEmptyObject()
  ordCliRighe?: OrdCliRigheDto | null;

  linkOrpOrd?: OrpEffCicliDto;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  ORP_EFF_DOC_ID: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  ORD_CLI_DOC_RIGA_ID: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  LINK_ORP_ORD_ID: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
