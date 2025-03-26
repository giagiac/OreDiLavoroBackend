import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrpEffCicliEntity } from '../entities/orp-eff-cicli.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { OrpEffCicli } from '../../../../domain/orp-eff-cicli';
import { OrpEffCicliRepository } from '../../orp-eff-cicli.repository';
import { OrpEffCicliMapper } from '../mappers/orp-eff-cicli.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FilterDto, SortDto } from '../../../../../utils/dto/filter-column';

@Injectable()
export class OrpEffCicliRelationalRepository implements OrpEffCicliRepository {
  constructor(
    @InjectRepository(OrpEffCicliEntity)
    private readonly orpEffCicliRepository: Repository<OrpEffCicliEntity>,
  ) {}

  async create(data: OrpEffCicli): Promise<OrpEffCicli> {
    const persistenceModel = OrpEffCicliMapper.toPersistence(data);
    const newEntity = await this.orpEffCicliRepository.save(
      this.orpEffCicliRepository.create(persistenceModel),
    );
    return OrpEffCicliMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<OrpEffCicli>> | null;
    sortOptions?: Array<SortDto<OrpEffCicli>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }): Promise<{ orpEffCicli: Array<OrpEffCicli>; count: number }> {
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

    const query = this.orpEffCicliRepository
      .createQueryBuilder('orpEffCicli')
      .innerJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
      .innerJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
      .innerJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
      .innerJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')
      .leftJoinAndSelect(
        'orpEffCicli.epsNestjsOrpEffCicliEsec',
        'epsNestjsOrpEffCicliEsec',
      )
      .select()
      .addSelect(
        `TO_CHAR("ordCliRighe".DATA_DOC, 'YY') || "x1TrasCodici".CODICE2 || "orpEff".NUM_DOC || '-' || "orpEffCicli".NUM_RIGA`,
        'CODICE_BREVE',
      ) // Using raw SQL for concatenation and formatted date
      .where(
        `TO_CHAR("ordCliRighe".DATA_DOC, 'YY') || "x1TrasCodici".CODICE2 || "orpEff".NUM_DOC || '-' || "orpEffCicli".NUM_RIGA =:CODICE_BREVE`,
        { CODICE_BREVE: '2414015-3' },
      );

    const entitiesAndCount = await query.getManyAndCount();

    return {
      orpEffCicli: entitiesAndCount[0].map((entity) =>
        OrpEffCicliMapper.toDomain(entity),
      ),
      count: entitiesAndCount[1],
    };
  }

  async findById(
    DOC_RIGA_ID: OrpEffCicli['DOC_RIGA_ID'],
  ): Promise<NullableType<OrpEffCicli>> {
    const entity = await this.orpEffCicliRepository.findOne({
      where: { DOC_RIGA_ID },
    });

    return entity ? OrpEffCicliMapper.toDomain(entity) : null;
  }

  async findByIds(ids: OrpEffCicli['DOC_RIGA_ID'][]): Promise<OrpEffCicli[]> {
    const entities = await this.orpEffCicliRepository.find({
      where: { DOC_RIGA_ID: In(ids) },
    });

    return entities.map((entity) => OrpEffCicliMapper.toDomain(entity));
  }

  async update(
    DOC_RIGA_ID: OrpEffCicli['DOC_RIGA_ID'],
    payload: Partial<OrpEffCicli>,
  ): Promise<OrpEffCicli> {
    const entity = await this.orpEffCicliRepository.findOne({
      where: { DOC_RIGA_ID },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.orpEffCicliRepository.save(
      this.orpEffCicliRepository.create(
        OrpEffCicliMapper.toPersistence({
          ...OrpEffCicliMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrpEffCicliMapper.toDomain(updatedEntity);
  }

  async remove(DOC_RIGA_ID: OrpEffCicli['DOC_RIGA_ID']): Promise<void> {
    await this.orpEffCicliRepository.delete(DOC_RIGA_ID);
  }
}
