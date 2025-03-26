// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateX1TrasCodiciDto } from './create-x1-tras-codici.dto';

export class UpdateX1TrasCodiciDto extends PartialType(CreateX1TrasCodiciDto) {}
