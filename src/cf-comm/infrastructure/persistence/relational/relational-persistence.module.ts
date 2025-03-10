import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CfCommRepository } from '../cf-comm.repository';
import { CfCommEntity } from './entities/cf-comm.entity';
import { CfCommRelationalRepository } from './repositories/cf-comm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CfCommEntity])],
  providers: [
    {
      provide: CfCommRepository,
      useClass: CfCommRelationalRepository,
    },
  ],
  exports: [CfCommRepository],
})
export class RelationalCfCommPersistenceModule {}
