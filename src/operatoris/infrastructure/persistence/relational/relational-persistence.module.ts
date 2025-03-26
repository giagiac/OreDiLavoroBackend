import { Module } from '@nestjs/common';
import { OperatoriRepository } from '../operatori.repository';
import { OperatoriRelationalRepository } from './repositories/operatori.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatoriEntity } from './entities/operatori.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperatoriEntity])],
  providers: [
    {
      provide: OperatoriRepository,
      useClass: OperatoriRelationalRepository,
    },
  ],
  exports: [OperatoriRepository],
})
export class RelationalOperatoriPersistenceModule {}
