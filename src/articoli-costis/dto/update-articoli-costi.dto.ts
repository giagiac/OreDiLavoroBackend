// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateArticoliCostiDto } from './create-articoli-costi.dto';

export class UpdateArticoliCostiDto extends PartialType(
  CreateArticoliCostiDto,
) {}
