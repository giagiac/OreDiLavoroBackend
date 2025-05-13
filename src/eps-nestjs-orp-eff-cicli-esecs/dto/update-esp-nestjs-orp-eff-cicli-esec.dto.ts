// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateEpsNestjsOrpEffCicliEsecDto } from './create-eps-nestjs-orp-eff-cicli-esec.dto';

export class UpdateEpsNestjsOrpEffCicliEsecDto extends PartialType(CreateEpsNestjsOrpEffCicliEsecDto) {}
