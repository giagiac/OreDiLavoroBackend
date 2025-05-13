import { Module } from '@nestjs/common';
import { EpsNestjsDestinazionisService } from './eps-nestjs-destinazionis.service';
import { EpsNestjsDestinazionisController } from './eps-nestjs-destinazionis.controller';
import { RelationalEpsNestjsDestinazioniPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalEpsNestjsDestinazioniPersistenceModule
  : RelationalEpsNestjsDestinazioniPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [EpsNestjsDestinazionisController],
  providers: [EpsNestjsDestinazionisService],
  exports: [EpsNestjsDestinazionisService, infrastructurePersistenceModule],
})
export class EpsNestjsDestinazionisModule {}
