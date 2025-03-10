import { ApiProperty } from '@nestjs/swagger';

export class ArticoliCostiCf {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
