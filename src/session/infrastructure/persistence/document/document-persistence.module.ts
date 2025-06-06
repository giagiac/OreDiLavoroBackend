import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionRepository } from '../session.repository';
import { SessionSchema, SessionSchemaClass } from './entities/session.schema';
import { SessionDocumentRepository } from './repositories/session.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: SessionSchemaClass.name, schema: SessionSchema }])],
  providers: [
    {
      provide: SessionRepository,
      useClass: SessionDocumentRepository,
    },
  ],
  exports: [SessionRepository],
})
export class DocumentSessionPersistenceModule {}
