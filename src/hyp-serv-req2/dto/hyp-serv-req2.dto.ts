import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AppReq3HypServDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
