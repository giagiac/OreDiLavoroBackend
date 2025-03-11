import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class art_anaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
