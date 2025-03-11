// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { Createart_anaDto } from './create-art-ana.dto';

export class Updateart_anaDto extends PartialType(Createart_anaDto) {}
