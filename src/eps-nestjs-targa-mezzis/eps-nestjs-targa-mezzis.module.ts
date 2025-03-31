import { Module } from '@nestjs/common';
import { EpsNestjsTargaMezzisService } from './eps-nestjs-targa-mezzis.service';
import { EpsNestjsTargaMezzisController } from './eps-nestjs-targa-mezzis.controller';
import { RelationalEpsNestjsTargaMezziPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalEpsNestjsTargaMezziPersistenceModule
  : RelationalEpsNestjsTargaMezziPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [EpsNestjsTargaMezzisController],
  providers: [EpsNestjsTargaMezzisService],
  exports: [EpsNestjsTargaMezzisService, infrastructurePersistenceModule],
})
export class EpsNestjsTargaMezzisModule {}
