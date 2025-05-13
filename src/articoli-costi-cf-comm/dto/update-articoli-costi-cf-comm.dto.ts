// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateArticoliCostiCfCommDto } from './create-articoli-costi-cf-comm.dto';

export class UpdateArticoliCostiCfCommDto extends PartialType(CreateArticoliCostiCfCommDto) {}
