import { Module } from '@nestjs/common';
import { EpsNestjsTargaMezziRepository } from '../eps-nestjs-targa-mezzi.repository';
import { EpsNestjsTargaMezziRelationalRepository } from './repositories/eps-nestjs-targa-mezzi.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpsNestjsTargaMezziEntity } from './entities/eps-nestjs-targa-mezzi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EpsNestjsTargaMezziEntity])],
  providers: [
    {
      provide: EpsNestjsTargaMezziRepository,
      useClass: EpsNestjsTargaMezziRelationalRepository,
    },
  ],
  exports: [EpsNestjsTargaMezziRepository],
})
export class RelationalEpsNestjsTargaMezziPersistenceModule {}
