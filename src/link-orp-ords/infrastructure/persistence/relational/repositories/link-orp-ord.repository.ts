import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { LinkOrpOrdEntity } from '../entities/link-orp-ord.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { LinkOrpOrd } from '../../../../domain/link-orp-ord';
import { LinkOrpOrdRepository } from '../../link-orp-ord.repository';
import { LinkOrpOrdMapper } from '../mappers/link-orp-ord.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class LinkOrpOrdRelationalRepository implements LinkOrpOrdRepository {
  constructor(
    @InjectRepository(LinkOrpOrdEntity)
    private readonly linkOrpOrdRepository: Repository<LinkOrpOrdEntity>,
  ) {}

  async create(data: LinkOrpOrd): Promise<LinkOrpOrd> {
    const persistenceModel = LinkOrpOrdMapper.toPersistence(data);
    const newEntity = await this.linkOrpOrdRepository.save(this.linkOrpOrdRepository.create(persistenceModel));
    return LinkOrpOrdMapper.toDomain(newEntity);
  }

  async findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<LinkOrpOrd[]> {
    const entities = await this.linkOrpOrdRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => LinkOrpOrdMapper.toDomain(entity));
  }

  async findById(ORP_EFF_DOC_ID: LinkOrpOrd['ORP_EFF_DOC_ID']): Promise<NullableType<LinkOrpOrd>> {
    const entity = await this.linkOrpOrdRepository.findOne({
      where: { ORP_EFF_DOC_ID },
    });

    return entity ? LinkOrpOrdMapper.toDomain(entity) : null;
  }

  async findByIds(ids: LinkOrpOrd['ORP_EFF_DOC_ID'][]): Promise<LinkOrpOrd[]> {
    const entities = await this.linkOrpOrdRepository.find({
      where: { ORP_EFF_DOC_ID: In(ids) },
    });

    return entities.map((entity) => LinkOrpOrdMapper.toDomain(entity));
  }

  async update(ORP_EFF_DOC_ID: LinkOrpOrd['ORP_EFF_DOC_ID'], payload: Partial<LinkOrpOrd>): Promise<LinkOrpOrd> {
    const entity = await this.linkOrpOrdRepository.findOne({
      where: { ORP_EFF_DOC_ID },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.linkOrpOrdRepository.save(
      this.linkOrpOrdRepository.create(
        LinkOrpOrdMapper.toPersistence({
          ...LinkOrpOrdMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return LinkOrpOrdMapper.toDomain(updatedEntity);
  }

  async remove(ORP_EFF_DOC_ID: LinkOrpOrd['ORP_EFF_DOC_ID']): Promise<void> {
    await this.linkOrpOrdRepository.delete(ORP_EFF_DOC_ID);
  }
}
