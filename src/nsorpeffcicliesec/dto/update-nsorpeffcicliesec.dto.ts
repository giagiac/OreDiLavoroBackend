// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatensorpeffcicliesecDto } from './create-nsorpeffcicliesec.dto';

export class UpdatensorpeffcicliesecDto extends PartialType(
  CreatensorpeffcicliesecDto,
) {}
