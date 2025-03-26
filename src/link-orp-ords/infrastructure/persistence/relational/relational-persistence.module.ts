import { Module } from '@nestjs/common';
import { LinkOrpOrdRepository } from '../link-orp-ord.repository';
import { LinkOrpOrdRelationalRepository } from './repositories/link-orp-ord.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkOrpOrdEntity } from './entities/link-orp-ord.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LinkOrpOrdEntity])],
  providers: [
    {
      provide: LinkOrpOrdRepository,
      useClass: LinkOrpOrdRelationalRepository,
    },
  ],
  exports: [LinkOrpOrdRepository],
})
export class RelationalLinkOrpOrdPersistenceModule {}
