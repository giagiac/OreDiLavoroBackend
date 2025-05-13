// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateOrdCliDto } from './create-ord-cli.dto';

export class UpdateOrdCliDto extends PartialType(CreateOrdCliDto) {}
