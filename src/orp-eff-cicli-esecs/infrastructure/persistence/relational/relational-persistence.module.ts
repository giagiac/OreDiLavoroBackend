import { Module } from '@nestjs/common';
import { OrpEffCicliEsecRepository } from '../orp-eff-cicli-esec.repository';
import { OrpEffCicliEsecRelationalRepository } from './repositories/orp-eff-cicli-esec.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrpEffCicliEsecEntity } from './entities/orp-eff-cicli-esec.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrpEffCicliEsecEntity])],
  providers: [
    {
      provide: OrpEffCicliEsecRepository,
      useClass: OrpEffCicliEsecRelationalRepository,
    },
  ],
  exports: [OrpEffCicliEsecRepository],
})
export class RelationalOrpEffCicliEsecPersistenceModule {}
