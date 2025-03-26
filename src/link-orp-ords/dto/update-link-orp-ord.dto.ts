// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateLinkOrpOrdDto } from './create-link-orp-ord.dto';

export class UpdateLinkOrpOrdDto extends PartialType(CreateLinkOrpOrdDto) {}
