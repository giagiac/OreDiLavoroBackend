// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateartCostiDto } from './create-art-costi.dto';

export class UpdateartCostiDto extends PartialType(CreateartCostiDto) {}
