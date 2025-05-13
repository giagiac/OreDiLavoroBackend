import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrdCliEntity } from '../entities/ord-cli.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { OrdCli } from '../../../../domain/ord-cli';
import { OrdCliRepository } from '../../ord-cli.repository';
import { OrdCliMapper } from '../mappers/ord-cli.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class OrdCliRelationalRepository implements OrdCliRepository {
  constructor(
    @InjectRepository(OrdCliEntity)
    private readonly ordCliRepository: Repository<OrdCliEntity>,
  ) {}

  async create(data: OrdCli): Promise<OrdCli> {
    const persistenceModel = OrdCliMapper.toPersistence(data);
    const newEntity = await this.ordCliRepository.save(this.ordCliRepository.create(persistenceModel));
    return OrdCliMapper.toDomain(newEntity);
  }

  async findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<OrdCli[]> {
    const entities = await this.ordCliRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => OrdCliMapper.toDomain(entity));
  }

  async findById(DOC_ID: OrdCli['DOC_ID']): Promise<NullableType<OrdCli>> {
    const entity = await this.ordCliRepository.findOne({
      where: { DOC_ID },
    });

    return entity ? OrdCliMapper.toDomain(entity) : null;
  }

  async findByIds(ids: OrdCli['DOC_ID'][]): Promise<OrdCli[]> {
    const entities = await this.ordCliRepository.find({
      where: { DOC_ID: In(ids) },
    });

    return entities.map((entity) => OrdCliMapper.toDomain(entity));
  }

  async update(DOC_ID: OrdCli['DOC_ID'], payload: Partial<OrdCli>): Promise<OrdCli> {
    const entity = await this.ordCliRepository.findOne({
      where: { DOC_ID },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.ordCliRepository.save(
      this.ordCliRepository.create(
        OrdCliMapper.toPersistence({
          ...OrdCliMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrdCliMapper.toDomain(updatedEntity);
  }

  async remove(DOC_ID: OrdCli['DOC_ID']): Promise<void> {
    await this.ordCliRepository.delete(DOC_ID);
  }
}
