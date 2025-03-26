import { ApiProperty } from '@nestjs/swagger';

export class X1TrasCodici {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  CODICE2?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  CODICE1: string;
}
