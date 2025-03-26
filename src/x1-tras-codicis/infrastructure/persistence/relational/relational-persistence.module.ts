import { Module } from '@nestjs/common';
import { X1TrasCodiciRepository } from '../x1-tras-codici.repository';
import { X1TrasCodiciRelationalRepository } from './repositories/x1-tras-codici.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { X1TrasCodiciEntity } from './entities/x1-tras-codici.entity';

@Module({
  imports: [TypeOrmModule.forFeature([X1TrasCodiciEntity])],
  providers: [
    {
      provide: X1TrasCodiciRepository,
      useClass: X1TrasCodiciRelationalRepository,
    },
  ],
  exports: [X1TrasCodiciRepository],
})
export class RelationalX1TrasCodiciPersistenceModule {}
