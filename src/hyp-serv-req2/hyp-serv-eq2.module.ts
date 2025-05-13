import { Module } from '@nestjs/common';
import { HypServReq2Service } from './hyp-serv-req2.service';
import { HypServReq2Controller } from './hyp-serv-req2.controller';
import { RelationalHypServReq2PersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? RelationalHypServReq2PersistenceModule
  : RelationalHypServReq2PersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [HypServReq2Controller],
  providers: [HypServReq2Service],
  exports: [HypServReq2Service, infrastructurePersistenceModule],
})
export class HypServReq2Module {}
