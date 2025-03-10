import { Module } from '@nestjs/common';

import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { FileConfig, FileDriver } from './config/file-config.type';
import fileConfig from './config/file.config';
import { FilesService } from './files.service';
import { DocumentFilePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { RelationalFilePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesLocalModule } from './infrastructure/uploader/local/files.module';
import { FilesS3PresignedModule } from './infrastructure/uploader/s3-presigned/files.module';
import { FilesS3Module } from './infrastructure/uploader/s3/files.module';

// <database-block>
const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentFilePersistenceModule
  : RelationalFilePersistenceModule;
// </database-block>

const infrastructureUploaderModule =
  (fileConfig() as FileConfig).driver === FileDriver.LOCAL
    ? FilesLocalModule
    : (fileConfig() as FileConfig).driver === FileDriver.S3
      ? FilesS3Module
      : FilesS3PresignedModule;

@Module({
  imports: [infrastructurePersistenceModule, infrastructureUploaderModule],
  providers: [FilesService],
  exports: [FilesService, infrastructurePersistenceModule],
})
export class FilesModule {}
