import { Module } from '@nestjs/common';
import { OrpEffCicliRepository } from '../orp-eff-cicli.repository';
import { OrpEffCicliRelationalRepository } from './repositories/orp-eff-cicli.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrpEffCicliEntity } from './entities/orp-eff-cicli.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrpEffCicliEntity])],
  providers: [
    {
      provide: OrpEffCicliRepository,
      useClass: OrpEffCicliRelationalRepository,
    },
  ],
  exports: [OrpEffCicliRepository],
})
export class RelationalOrpEffCicliPersistenceModule {}
