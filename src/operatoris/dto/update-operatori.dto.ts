// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateOperatoriDto } from './create-operatori.dto';

export class UpdateOperatoriDto extends PartialType(CreateOperatoriDto) {}
