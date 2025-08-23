import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FilterDto, SortDto } from '../../../../../utils/dto/filter-column';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { OrpEffCicliEsec } from '../../../../domain/orp-eff-cicli-esec';
import { OrpEffCicliEsecRepository } from '../../orp-eff-cicli-esec.repository';
import { OrpEffCicliEsecEntity } from '../entities/orp-eff-cicli-esec.entity';
import { OrpEffCicliEsecMapper } from '../mappers/orp-eff-cicli-esec.mapper';

@Injectable()
export class OrpEffCicliEsecRelationalRepository implements OrpEffCicliEsecRepository {
  constructor(
    @InjectRepository(OrpEffCicliEsecEntity)
    private readonly orpEffCicliEsecRepository: Repository<OrpEffCicliEsecEntity>,
  ) {}

  async create(data: OrpEffCicliEsec): Promise<OrpEffCicliEsec> {
    const persistenceModel = OrpEffCicliEsecMapper.toPersistence(data);
    const newEntity = await this.orpEffCicliEsecRepository.save(this.orpEffCicliEsecRepository.create(persistenceModel));
    return OrpEffCicliEsecMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<OrpEffCicliEsec>> | null;
    sortOptions?: Array<SortDto<OrpEffCicliEsec>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }): Promise<{ orpEffCicliEsec: Array<OrpEffCicliEsec>; count: number }> {
    // const entities = await this.orpEffCicliEsecRepository.find({
    //   skip: (paginationOptions.page - 1) * paginationOptions.limit,
    //   take: paginationOptions.limit,
    // });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // const query = this.orpEffCicliEsecRepository
    //   .createQueryBuilder('orpEffCicliEsec')
    //   .leftJoinAndSelect('orpEffCicliEsec.orpEffCicli', 'orpEffCicli')
    //   .leftJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
    //   .leftJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
    //   .leftJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
    //   .leftJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')
    //   .select()
    //   //.addSelect(`TO_CHAR(oCR.DATA_DOC, 'YY') || x1.CODICE2 || oP.NUM_DOC || '-' || oFC.NUM_RIGA`, 'concatenatedString') // Using raw SQL for concatenation and formatted date
    //   .where(
    //     '(TRUNC(orpEffCicliEsec.DATA_INIZIO) = :t1 AND TRUNC(orpEffCicliEsec.DATA_FINE) = :t2)',
    //     {
    //       t1: today,
    //       t2: today,
    //     },
    //   );
    //   // .where(
    //   //   'TRUNC(SYSDATE) BETWEEN TRUNC(orpEffCicliEsec.DATA_INIZIO) AND TRUNC(orpEffCicliEsec.DATA_FINE)',
    //   // );

    const query = this.orpEffCicliEsecRepository
      .createQueryBuilder('orpEffCicliEsec')
      .leftJoinAndSelect('orpEffCicliEsec.orpEffCicli', 'orpEffCicli')
      .leftJoinAndSelect('orpEffCicliEsec.epsNestjsOrpEffCicliEsec', 'epsNestjsOrpEffCicliEsec')
      .leftJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
      .leftJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
      .leftJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
      .leftJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')
      .select()
      .addSelect(
        `TO_CHAR("orpEff".DATA_DOC, 'YY') || "x1TrasCodici".CODICE2 || "orpEff".NUM_DOC || '-' || "orpEffCicli".NUM_RIGA`,
        'CODICE_BREVE',
      ) // Using raw SQL for concatenation and formatted date
      .where('TRUNC(SYSDATE) BETWEEN TRUNC(orpEffCicliEsec.DATA_INIZIO) AND TRUNC(orpEffCicliEsec.DATA_FINE)');

    const entitiesAndCount = await query.getManyAndCount();

    return {
      orpEffCicliEsec: entitiesAndCount[0].map((entity) => OrpEffCicliEsecMapper.toDomain(entity)),
      count: entitiesAndCount[1],
    };
  }

  async findById(DOC_RIGA_ESEC_ID: OrpEffCicliEsec['DOC_RIGA_ESEC_ID']): Promise<NullableType<OrpEffCicliEsec>> {
    const entity = await this.orpEffCicliEsecRepository.findOne({
      where: { DOC_RIGA_ESEC_ID },
    });

    return entity ? OrpEffCicliEsecMapper.toDomain(entity) : null;
  }

  async findByIds(ids: OrpEffCicliEsec['DOC_RIGA_ESEC_ID'][]): Promise<OrpEffCicliEsec[]> {
    const entities = await this.orpEffCicliEsecRepository.find({
      where: { DOC_RIGA_ESEC_ID: In(ids) },
    });

    return entities.map((entity) => OrpEffCicliEsecMapper.toDomain(entity));
  }

  async update(DOC_RIGA_ESEC_ID: OrpEffCicliEsec['DOC_RIGA_ESEC_ID'], payload: Partial<OrpEffCicliEsec>): Promise<OrpEffCicliEsec> {
    const entity = await this.orpEffCicliEsecRepository.findOne({
      where: { DOC_RIGA_ESEC_ID },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.orpEffCicliEsecRepository.save(
      this.orpEffCicliEsecRepository.create(
        OrpEffCicliEsecMapper.toPersistence({
          ...OrpEffCicliEsecMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrpEffCicliEsecMapper.toDomain(updatedEntity);
  }

  async remove(DOC_RIGA_ESEC_ID: OrpEffCicliEsec['DOC_RIGA_ESEC_ID']): Promise<void> {
    await this.orpEffCicliEsecRepository.delete(DOC_RIGA_ESEC_ID);
  }
}
