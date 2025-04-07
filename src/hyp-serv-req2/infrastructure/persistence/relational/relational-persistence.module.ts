import { Module } from '@nestjs/common';
import { HypServReq2Repository } from '../hyp-serv-req2.repository';
import { HypServReq2RelationalRepository } from './repositories/hyp-serv-req2.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HypServReq2Entity } from './entities/hyp-serv-req2.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HypServReq2Entity])],
  providers: [
    {
      provide: HypServReq2Repository,
      useClass: HypServReq2RelationalRepository,
    },
  ],
  exports: [HypServReq2Repository],
})
export class RelationalHypServReq2PersistenceModule {}
