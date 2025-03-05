import { Module } from '@nestjs/common';
import { CfRepository } from '../cf.repository';
import { CfRelationalRepository } from './repositories/cf.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CfEntity } from './entities/cf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CfEntity])],
  providers: [
    {
      provide: CfRepository,
      useClass: CfRelationalRepository,
    },
  ],
  exports: [CfRepository],
})
export class RelationalCfPersistenceModule {}
