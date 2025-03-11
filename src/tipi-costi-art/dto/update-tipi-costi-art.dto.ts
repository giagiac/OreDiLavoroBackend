// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatetipiCostiArtDto } from './create-tipi-costi-art.dto';

export class UpdatetipiCostiArtDto extends PartialType(CreatetipiCostiArtDto) {}
