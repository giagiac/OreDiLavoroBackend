import { Module } from '@nestjs/common';
import { EpsNestjsDestinazioniRepository } from '../eps-nestjs-destinazioni.repository';
import { EpsNestjsDestinazioniRelationalRepository } from './repositories/eps-nestjs-destinazioni.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpsNestjsDestinazioniEntity } from './entities/eps-nestjs-destinazioni.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EpsNestjsDestinazioniEntity])],
  providers: [
    {
      provide: EpsNestjsDestinazioniRepository,
      useClass: EpsNestjsDestinazioniRelationalRepository,
    },
  ],
  exports: [EpsNestjsDestinazioniRepository],
})
export class RelationalEpsNestjsDestinazioniPersistenceModule {}
