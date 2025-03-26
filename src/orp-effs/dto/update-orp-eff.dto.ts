// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateOrpEffDto } from './create-orp-eff.dto';

export class UpdateOrpEffDto extends PartialType(CreateOrpEffDto) {}
