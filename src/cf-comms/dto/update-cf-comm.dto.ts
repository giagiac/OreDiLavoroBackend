// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateCfCommDto } from './create-cf-comm.dto';

export class UpdateCfCommDto extends PartialType(CreateCfCommDto) {}
