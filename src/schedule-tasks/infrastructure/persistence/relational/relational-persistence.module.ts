import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticoliCostiCfCommEntity } from '../../../../articoli-costi-cf-comm/infrastructure/persistence/relational/entities/articoli-costi-cf-comm.entity';
import { ArticoliCostiCfEntity } from '../../../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { ScheduleTasksRepository } from '../schedule-tasks.repository';
import { ScheduleTasksEntity } from './entities/schedule-tasks.entity';
import { ScheduleTasksRelationalRepository } from './repositories/schedule-tasks.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScheduleTasksEntity,
      EpsNestjsOrpEffCicliEsecEntity,
      ArticoliCostiCfEntity,
      ArticoliCostiCfCommEntity
    ]),
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: ScheduleTasksRepository,
      useClass: ScheduleTasksRelationalRepository,
    }
  ],
  exports: [ScheduleTasksRepository],
})
export class RelationalScheduleTasksPersistenceModule {}
