import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { EpsNestjsDestinazioniEntity } from '../entities/eps-nestjs-destinazioni.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { EpsNestjsDestinazioni } from '../../../../domain/eps-nestjs-destinazioni';
import { EpsNestjsDestinazioniRepository } from '../../eps-nestjs-destinazioni.repository';
import { EpsNestjsDestinazioniMapper } from '../mappers/eps-nestjs-destinazioni.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class EpsNestjsDestinazioniRelationalRepository implements EpsNestjsDestinazioniRepository {
  constructor(
    @InjectRepository(EpsNestjsDestinazioniEntity)
    private readonly epsNestjsDestinazioniRepository: Repository<EpsNestjsDestinazioniEntity>,
  ) {}

  async create(data: EpsNestjsDestinazioni): Promise<EpsNestjsDestinazioni> {
    const persistenceModel = EpsNestjsDestinazioniMapper.toPersistence(data);
    const newEntity = await this.epsNestjsDestinazioniRepository.save(this.epsNestjsDestinazioniRepository.create(persistenceModel));
    return EpsNestjsDestinazioniMapper.toDomain(newEntity);
  }

  async findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<EpsNestjsDestinazioni[]> {
    const entities = await this.epsNestjsDestinazioniRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => EpsNestjsDestinazioniMapper.toDomain(entity));
  }

  async findById(id: EpsNestjsDestinazioni['id']): Promise<NullableType<EpsNestjsDestinazioni>> {
    const entity = await this.epsNestjsDestinazioniRepository.findOne({
      where: { id },
    });

    return entity ? EpsNestjsDestinazioniMapper.toDomain(entity) : null;
  }

  async findByIds(ids: EpsNestjsDestinazioni['id'][]): Promise<EpsNestjsDestinazioni[]> {
    const entities = await this.epsNestjsDestinazioniRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => EpsNestjsDestinazioniMapper.toDomain(entity));
  }

  async update(id: EpsNestjsDestinazioni['id'], payload: Partial<EpsNestjsDestinazioni>): Promise<EpsNestjsDestinazioni> {
    const entity = await this.epsNestjsDestinazioniRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.epsNestjsDestinazioniRepository.save(
      this.epsNestjsDestinazioniRepository.create(
        EpsNestjsDestinazioniMapper.toPersistence({
          ...EpsNestjsDestinazioniMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return EpsNestjsDestinazioniMapper.toDomain(updatedEntity);
  }

  async remove(id: EpsNestjsDestinazioni['id']): Promise<void> {
    await this.epsNestjsDestinazioniRepository.delete(id);
  }
}
