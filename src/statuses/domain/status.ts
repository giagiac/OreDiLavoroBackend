import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { DatabaseConfig } from '../../database/config/database-config.type';
import databaseConfig from '../../database/config/database.config';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

export class Status {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'active',
  })
  name?: string;
}
