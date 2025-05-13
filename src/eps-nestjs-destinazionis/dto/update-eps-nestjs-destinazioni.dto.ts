// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateEpsNestjsDestinazioniDto } from './create-eps-nestjs-destinazioni.dto';

export class UpdateEpsNestjsDestinazioniDto extends PartialType(CreateEpsNestjsDestinazioniDto) {}
