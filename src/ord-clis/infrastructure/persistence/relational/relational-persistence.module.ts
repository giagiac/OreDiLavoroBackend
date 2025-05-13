import { Module } from '@nestjs/common';
import { OrdCliRepository } from '../ord-cli.repository';
import { OrdCliRelationalRepository } from './repositories/ord-cli.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdCliEntity } from './entities/ord-cli.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdCliEntity])],
  providers: [
    {
      provide: OrdCliRepository,
      useClass: OrdCliRelationalRepository,
    },
  ],
  exports: [OrdCliRepository],
})
export class RelationalOrdCliPersistenceModule {}
