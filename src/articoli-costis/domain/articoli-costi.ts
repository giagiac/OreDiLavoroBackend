import { ApiProperty } from '@nestjs/swagger';
import { CfCommEntity } from '../../cf-comms/infrastructure/persistence/relational/entities/cf-comm.entity';

export class ArticoliCosti {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  costo1?: string | null;
  
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  costo2?: string | null;

  @ApiProperty({
    type: String,
  })
  CF_COMM_ID: string;

  @ApiProperty({
    type: () => CfCommEntity,
  })
  CfComm?: CfCommEntity | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
