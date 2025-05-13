import { Module } from '@nestjs/common';
import { EpsNestjsOrpEffCicliEsecChildrenService } from './eps-nestjs-orp-eff-cicli-esec-children.service';
import { EpsNestjsOrpEffCicliEsecChildrenController } from './eps-nestjs-orp-eff-cicli-esec-children.controller';
import { RelationalEpsNestjsOrpEffCicliEsecChildPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';
import { UsersModule } from '../users/users.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalEpsNestjsOrpEffCicliEsecChildPersistenceModule
  : RelationalEpsNestjsOrpEffCicliEsecChildPersistenceModule;

@Module({
  imports: [
    UsersModule,
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [EpsNestjsOrpEffCicliEsecChildrenController],
  providers: [EpsNestjsOrpEffCicliEsecChildrenService],
  exports: [EpsNestjsOrpEffCicliEsecChildrenService, infrastructurePersistenceModule],
})
export class EpsNestjsOrpEffCicliEsecChildrenModule {}
