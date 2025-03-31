import { ApiProperty } from '@nestjs/swagger';

export class EpsNestjsTargaMezzi {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  COD_ART: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
