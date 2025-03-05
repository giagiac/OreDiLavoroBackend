import { Module } from '@nestjs/common';
import { CfCommRepository } from '../cf-comm.repository';
import { CfCommRelationalRepository } from './repositories/cf-comm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CfCommEntity } from './entities/cf-comm.entity';

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
