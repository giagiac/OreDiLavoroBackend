import { Module } from '@nestjs/common';
import { OrpEffRepository } from '../orp-eff.repository';
import { OrpEffRelationalRepository } from './repositories/orp-eff.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrpEffEntity } from './entities/orp-eff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrpEffEntity])],
  providers: [
    {
      provide: OrpEffRepository,
      useClass: OrpEffRelationalRepository,
    },
  ],
  exports: [OrpEffRepository],
})
export class RelationalOrpEffPersistenceModule {}
