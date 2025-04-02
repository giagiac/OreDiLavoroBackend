import { Module } from '@nestjs/common';
import { OrdCliTrasRepository } from '../ord-cli-tras.repository';
import { OrdCliTrasRelationalRepository } from './repositories/ord-cli-tras.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdCliTrasEntity } from './entities/ord-cli-tras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdCliTrasEntity])],
  providers: [
    {
      provide: OrdCliTrasRepository,
      useClass: OrdCliTrasRelationalRepository,
    },
  ],
  exports: [OrdCliTrasRepository],
})
export class RelationalOrdCliTrasPersistenceModule {}
