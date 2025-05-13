import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { EpsNestjsOrpEffCicliEsecsController } from './eps-nestjs-orp-eff-cicli-esecs.controller';
import { EpsNestjsOrpEffCicliEsecsService } from './eps-nestjs-orp-eff-cicli-esecs.service';
import { RelationalEpsNestjsOrpEffCicliEsecPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SessionModule } from '../session/session.module';
import { UsersModule } from '../users/users.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalEpsNestjsOrpEffCicliEsecPersistenceModule
  : RelationalEpsNestjsOrpEffCicliEsecPersistenceModule;

@Module({
  imports: [
    UsersModule,
    SessionModule,
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [EpsNestjsOrpEffCicliEsecsController],
  providers: [EpsNestjsOrpEffCicliEsecsService],
  exports: [EpsNestjsOrpEffCicliEsecsService, infrastructurePersistenceModule],
})
export class EpsNestjsOrpEffCicliEsecsModule {}
