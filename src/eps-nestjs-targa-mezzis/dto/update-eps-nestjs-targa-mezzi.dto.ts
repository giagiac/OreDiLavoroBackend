// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateEpsNestjsTargaMezziDto } from './create-eps-nestjs-targa-mezzi.dto';

export class UpdateEpsNestjsTargaMezziDto extends PartialType(CreateEpsNestjsTargaMezziDto) {}
