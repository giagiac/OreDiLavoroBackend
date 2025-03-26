import { Module } from '@nestjs/common';
import { OrdCliRigheRepository } from '../ord-cli-righe.repository';
import { OrdCliRigheRelationalRepository } from './repositories/ord-cli-righe.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdCliRigheEntity } from './entities/ord-cli-righe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdCliRigheEntity])],
  providers: [
    {
      provide: OrdCliRigheRepository,
      useClass: OrdCliRigheRelationalRepository,
    },
  ],
  exports: [OrdCliRigheRepository],
})
export class RelationalOrdCliRighePersistenceModule {}
