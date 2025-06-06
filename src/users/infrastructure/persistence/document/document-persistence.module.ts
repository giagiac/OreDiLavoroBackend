import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from '../user.repository';
import { UserSchema, UserSchemaClass } from './entities/user.schema';
import { UsersDocumentRepository } from './repositories/user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserSchemaClass.name, schema: UserSchema }])],
  providers: [
    {
      provide: UserRepository,
      useClass: UsersDocumentRepository,
    },
  ],
  exports: [UserRepository],
})
export class DocumentUserPersistenceModule {}
