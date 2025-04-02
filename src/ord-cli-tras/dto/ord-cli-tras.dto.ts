import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrdCliTrasDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
