import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrdCliRigheDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
