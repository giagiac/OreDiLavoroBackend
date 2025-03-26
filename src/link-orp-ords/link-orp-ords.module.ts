import { OrdCliRighesModule } from '../ord-cli-righes/ord-cli-righes.module';
import { OrpEffCiclisModule } from '../orp-eff-ciclis/orp-eff-ciclis.module';
import { Module } from '@nestjs/common';
import { LinkOrpOrdsService } from './link-orp-ords.service';
import { LinkOrpOrdsController } from './link-orp-ords.controller';
import { RelationalLinkOrpOrdPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalLinkOrpOrdPersistenceModule
  : RelationalLinkOrpOrdPersistenceModule;

@Module({
  imports: [
    OrdCliRighesModule,

    OrpEffCiclisModule,

    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [LinkOrpOrdsController],
  providers: [LinkOrpOrdsService],
  exports: [LinkOrpOrdsService, infrastructurePersistenceModule],
})
export class LinkOrpOrdsModule {}
