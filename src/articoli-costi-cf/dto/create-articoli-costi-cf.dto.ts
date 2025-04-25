import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { TipoTrasferta } from '../infrastructure/persistence/relational/entities/articoli-costi-cf.entity';

export class CreateArticoliCostiCfDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  TIPO_TRASFERTA?: TipoTrasferta;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  COD_ART?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  COD_CF: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
