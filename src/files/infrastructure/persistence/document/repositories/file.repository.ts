import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileType } from '../../../../domain/file';
import { FileRepository } from '../../file.repository';
import { FileSchemaClass } from '../entities/file.schema';

import { NullableType } from '../../../../../utils/types/nullable.type';
import { FileMapper } from '../mappers/file.mapper';

@Injectable()
export class FileDocumentRepository implements FileRepository {
  constructor(
    @InjectModel(FileSchemaClass.name)
    private fileModel: Model<FileSchemaClass>,
  ) {}

  async create(data: Omit<FileType, 'id'>): Promise<FileType> {
    const createdFile = new this.fileModel(data);
    const fileObject = await createdFile.save();
    return FileMapper.toDomain(fileObject);
  }

  async findById(id: FileType['id']): Promise<NullableType<FileType>> {
    const fileObject = await this.fileModel.findById(id);
    return fileObject ? FileMapper.toDomain(fileObject) : null;
  }

  async findByIds(ids: FileType['id'][]): Promise<FileType[]> {
    const fileObjects = await this.fileModel.find({ _id: { $in: ids } });
    return fileObjects.map((fileObject) => FileMapper.toDomain(fileObject));
  }
}
