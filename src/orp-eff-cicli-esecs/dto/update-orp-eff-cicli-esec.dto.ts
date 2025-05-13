// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateOrpEffCicliEsecDto } from './create-orp-eff-cicli-esec.dto';

export class UpdateOrpEffCicliEsecDto extends PartialType(CreateOrpEffCicliEsecDto) {}
