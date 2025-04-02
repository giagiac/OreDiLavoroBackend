// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateOrdCliTrasDto } from './create-ord-cli-tras.dto';

export class UpdateOrdCliTrasDto extends PartialType(CreateOrdCliTrasDto) {}
