import { ApiProperty } from '@nestjs/swagger';

export class EpsNestjsDestinazioni {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  RESPONSE: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  VALUE: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  KM: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  LINK: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
