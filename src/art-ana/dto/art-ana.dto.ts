import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ArtAnaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class JoinDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  join?: string | null;
}
