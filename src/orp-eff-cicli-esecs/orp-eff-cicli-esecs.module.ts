import { OrpEffCiclisModule } from '../orp-eff-ciclis/orp-eff-ciclis.module';
import { Module } from '@nestjs/common';
import { OrpEffCicliEsecsService } from './orp-eff-cicli-esecs.service';
import { OrpEffCicliEsecsController } from './orp-eff-cicli-esecs.controller';
import { RelationalOrpEffCicliEsecPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalOrpEffCicliEsecPersistenceModule
  : RelationalOrpEffCicliEsecPersistenceModule;

@Module({
  imports: [
    OrpEffCiclisModule,

    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [OrpEffCicliEsecsController],
  providers: [OrpEffCicliEsecsService],
  exports: [OrpEffCicliEsecsService, infrastructurePersistenceModule],
})
export class OrpEffCicliEsecsModule {}
