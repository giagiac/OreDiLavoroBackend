// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateArticoliCostiCfDto } from './create-articoli-costi-cf.dto';

export class UpdateArticoliCostiCfDto extends PartialType(CreateArticoliCostiCfDto) {}
