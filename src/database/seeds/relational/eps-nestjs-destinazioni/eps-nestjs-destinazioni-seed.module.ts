import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpsNestjsDestinazioniEntity } from '../../../../eps-nestjs-destinazionis/infrastructure/persistence/relational/entities/eps-nestjs-destinazioni.entity';
import { EpsNestjsDestinazioniSeedService } from './eps-nestjs-destinazioni-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([EpsNestjsDestinazioniEntity])],
  providers: [EpsNestjsDestinazioniSeedService],
  exports: [EpsNestjsDestinazioniSeedService],
})
export class EpsNestjsDestinazioniSeedModule {}
