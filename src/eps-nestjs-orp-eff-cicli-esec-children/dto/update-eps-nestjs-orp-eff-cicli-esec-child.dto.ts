// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateEpsNestjsOrpEffCicliEsecChildDto } from './create-eps-nestjs-orp-eff-cicli-esec-child.dto';

export class UpdateEpsNestjsOrpEffCicliEsecChildDto extends PartialType(CreateEpsNestjsOrpEffCicliEsecChildDto) {}
