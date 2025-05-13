import { Module } from '@nestjs/common';
import { OrpEffCiclisService } from './orp-eff-ciclis.service';
import { OrpEffCiclisController } from './orp-eff-ciclis.controller';
import { RelationalOrpEffCicliPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalOrpEffCicliPersistenceModule
  : RelationalOrpEffCicliPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [OrpEffCiclisController],
  providers: [OrpEffCiclisService],
  exports: [OrpEffCiclisService, infrastructurePersistenceModule],
})
export class OrpEffCiclisModule {}
