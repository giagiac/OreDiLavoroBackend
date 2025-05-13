import { Logger, Module } from '@nestjs/common';
import { AppReq3HypServsModule } from '../app-req3-hyp-servs/app-req3-hyp-servs.module';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { EpsNestjsDestinazionisModule } from '../eps-nestjs-destinazionis/eps-nestjs-destinazionis.module';
import { RelationalScheduleTasksPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ScheduleTasksController } from './schedule-tasks.controller';
import { ScheduleTasksService } from './schedule-tasks.service';
import { HypServReq2Module } from '../hyp-serv-req2/hyp-serv-eq2.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalScheduleTasksPersistenceModule
  : RelationalScheduleTasksPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [ScheduleTasksController],
  providers: [ScheduleTasksService, Logger],
  exports: [ScheduleTasksService, infrastructurePersistenceModule],
})
export class ScheduleTasksModule {}
