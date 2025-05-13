import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { X1TrasCodiciEntity } from '../entities/x1-tras-codici.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { X1TrasCodici } from '../../../../domain/x1-tras-codici';
import { X1TrasCodiciRepository } from '../../x1-tras-codici.repository';
import { X1TrasCodiciMapper } from '../mappers/x1-tras-codici.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class X1TrasCodiciRelationalRepository implements X1TrasCodiciRepository {
  constructor(
    @InjectRepository(X1TrasCodiciEntity)
    private readonly x1TrasCodiciRepository: Repository<X1TrasCodiciEntity>,
  ) {}

  async create(data: X1TrasCodici): Promise<X1TrasCodici> {
    const persistenceModel = X1TrasCodiciMapper.toPersistence(data);
    const newEntity = await this.x1TrasCodiciRepository.save(this.x1TrasCodiciRepository.create(persistenceModel));
    return X1TrasCodiciMapper.toDomain(newEntity);
  }

  async findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<X1TrasCodici[]> {
    const entities = await this.x1TrasCodiciRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => X1TrasCodiciMapper.toDomain(entity));
  }

  async findById(CODICE1: X1TrasCodici['CODICE1']): Promise<NullableType<X1TrasCodici>> {
    const entity = await this.x1TrasCodiciRepository.findOne({
      where: { CODICE1 },
    });

    return entity ? X1TrasCodiciMapper.toDomain(entity) : null;
  }

  async findByIds(ids: X1TrasCodici['CODICE1'][]): Promise<X1TrasCodici[]> {
    const entities = await this.x1TrasCodiciRepository.find({
      where: { CODICE1: In(ids) },
    });

    return entities.map((entity) => X1TrasCodiciMapper.toDomain(entity));
  }

  async update(CODICE1: X1TrasCodici['CODICE1'], payload: Partial<X1TrasCodici>): Promise<X1TrasCodici> {
    const entity = await this.x1TrasCodiciRepository.findOne({
      where: { CODICE1 },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.x1TrasCodiciRepository.save(
      this.x1TrasCodiciRepository.create(
        X1TrasCodiciMapper.toPersistence({
          ...X1TrasCodiciMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return X1TrasCodiciMapper.toDomain(updatedEntity);
  }

  async remove(CODICE1: X1TrasCodici['CODICE1']): Promise<void> {
    await this.x1TrasCodiciRepository.delete(CODICE1);
  }
}
