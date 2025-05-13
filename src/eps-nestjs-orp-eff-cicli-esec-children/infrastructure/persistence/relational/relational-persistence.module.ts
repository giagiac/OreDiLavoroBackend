import { Module } from '@nestjs/common';
import { EpsNestjsOrpEffCicliEsecChildRepository } from '../eps-nestjs-orp-eff-cicli-esec-child.repository';
import { EpsNestjsOrpEffCicliEsecChildRelationalRepository } from './repositories/eps-nestjs-orp-eff-cicli-esec-child.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpsNestjsOrpEffCicliEsecChildEntity } from './entities/eps-nestjs-orp-eff-cicli-esec-child.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EpsNestjsOrpEffCicliEsecChildEntity])],
  providers: [
    {
      provide: EpsNestjsOrpEffCicliEsecChildRepository,
      useClass: EpsNestjsOrpEffCicliEsecChildRelationalRepository,
    },
  ],
  exports: [EpsNestjsOrpEffCicliEsecChildRepository],
})
export class RelationalEpsNestjsOrpEffCicliEsecChildPersistenceModule {}
