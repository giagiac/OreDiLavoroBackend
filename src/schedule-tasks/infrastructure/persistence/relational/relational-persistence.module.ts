import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppReq3HypServRepository } from '../../../../app-req3-hyp-servs/infrastructure/persistence/app-req3-hyp-serv.repository';
import { AppReq3HypServEntity } from '../../../../app-req3-hyp-servs/infrastructure/persistence/relational/entities/app-req3-hyp-serv.entity';
import { AppReq3HypServRelationalRepository } from '../../../../app-req3-hyp-servs/infrastructure/persistence/relational/repositories/app-req3-hyp-serv.repository';
import { EpsNestjsDestinazioniRepository } from '../../../../eps-nestjs-destinazionis/infrastructure/persistence/eps-nestjs-destinazioni.repository';
import { EpsNestjsDestinazioniRelationalRepository } from '../../../../eps-nestjs-destinazionis/infrastructure/persistence/relational/repositories/eps-nestjs-destinazioni.repository';
import { EpsNestjsOrpEffCicliEsecRepository } from '../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/eps-nestjs-orp-eff-cicli-esec.repository';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { EpsNestjsOrpEffCicliEsecRelationalRepository } from '../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/repositories/eps-nestjs-orp-eff-cicli-esec.repository';
import { ScheduleTasksRepository } from '../schedule-tasks.repository';
import { ScheduleTasksEntity } from './entities/schedule-tasks.entity';
import { ScheduleTasksRelationalRepository } from './repositories/schedule-tasks.repository';
import { EpsNestjsDestinazioniEntity } from '../../../../eps-nestjs-destinazionis/infrastructure/persistence/relational/entities/eps-nestjs-destinazioni.entity';
import { HypServReq2RelationalRepository } from '../../../../hyp-serv-req2/infrastructure/persistence/relational/repositories/hyp-serv-req2.repository';
import { HypServReq2Entity } from '../../../../hyp-serv-req2/infrastructure/persistence/relational/entities/hyp-serv-req2.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScheduleTasksEntity,
      EpsNestjsOrpEffCicliEsecEntity,
      AppReq3HypServEntity,
      EpsNestjsDestinazioniEntity,
      HypServReq2Entity,
    ]),
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: ScheduleTasksRepository,
      useClass: ScheduleTasksRelationalRepository,
    },
    {
      provide: EpsNestjsOrpEffCicliEsecRepository,
      useClass: EpsNestjsOrpEffCicliEsecRelationalRepository,
    },
    {
      provide: AppReq3HypServRepository,
      useClass: AppReq3HypServRelationalRepository,
    },
    {
      provide: EpsNestjsDestinazioniRepository,
      useClass: EpsNestjsDestinazioniRelationalRepository,
    },
    {
      provide: HypServReq2RelationalRepository,
      useClass: HypServReq2RelationalRepository,
    },
  ],
  exports: [ScheduleTasksRepository],
})
export class RelationalScheduleTasksPersistenceModule {}
