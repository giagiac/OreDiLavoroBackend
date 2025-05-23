import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileRepository } from '../file.repository';
import { FileSchema, FileSchemaClass } from './entities/file.schema';
import { FileDocumentRepository } from './repositories/file.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: FileSchemaClass.name, schema: FileSchema }])],
  providers: [
    {
      provide: FileRepository,
      useClass: FileDocumentRepository,
    },
  ],
  exports: [FileRepository],
})
export class DocumentFilePersistenceModule {}
