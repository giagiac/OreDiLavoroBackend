import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpsNestjsOrpEffCicliEsecRepository } from '../eps-nestjs-orp-eff-cicli-esec.repository';
import { EpsNestjsOrpEffCicliEsecEntity } from './entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { EpsNestjsOrpEffCicliEsecRelationalRepository } from './repositories/eps-nestjs-orp-eff-cicli-esec.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EpsNestjsOrpEffCicliEsecEntity])],
  providers: [
    {
      provide: EpsNestjsOrpEffCicliEsecRepository,
      useClass: EpsNestjsOrpEffCicliEsecRelationalRepository,
    },
  ],
  exports: [EpsNestjsOrpEffCicliEsecRepository],
})
export class RelationalEpsNestjsOrpEffCicliEsecPersistenceModule {}
