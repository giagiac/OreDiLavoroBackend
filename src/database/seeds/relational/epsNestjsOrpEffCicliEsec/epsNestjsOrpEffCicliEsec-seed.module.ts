import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EpsNestjsOrpEffCicliEsecSeedService } from './epsNestjsOrpEffCicliEsec-seed.service';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EpsNestjsOrpEffCicliEsecEntity])],
  providers: [EpsNestjsOrpEffCicliEsecSeedService],
  exports: [EpsNestjsOrpEffCicliEsecSeedService],
})
export class EpsNestjsOrpEffCicliEsecSeedModule {}
