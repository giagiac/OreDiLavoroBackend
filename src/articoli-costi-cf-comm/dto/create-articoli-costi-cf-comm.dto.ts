import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { TipoTrasferta } from '../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';

export class CreateArticoliCostiCfCommDto {
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
  CF_COMM_ID: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
