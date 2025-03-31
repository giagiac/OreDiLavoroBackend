import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import {
  applicaSort,
  FilterDto,
  SortDto,
} from '../../../../../utils/dto/filter-column';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { EpsNestjsOrpEffCicliEsec } from '../../../../domain/eps-nestjs-orp-eff-cicli-esec';
import { EpsNestjsOrpEffCicliEsecDto } from '../../../../dto/esp-nestjs-orp-eff-cicli-esec.dto';
import { EpsNestjsOrpEffCicliEsecRepository } from '../../eps-nestjs-orp-eff-cicli-esec.repository';
import { EpsNestjsOrpEffCicliEsecEntity } from '../entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { EpsNestjsOrpEffCicliEsecMapper } from '../mappers/eps-nestjs-orp-eff-cicli-esec.mapper';
import Decimal from 'decimal.js';

@Injectable()
export class EpsNestjsOrpEffCicliEsecRelationalRepository
  implements EpsNestjsOrpEffCicliEsecRepository
{
  constructor(
    @InjectRepository(EpsNestjsOrpEffCicliEsecEntity)
    private readonly epsNestjsOrpEffCicliEsecRepository: Repository<EpsNestjsOrpEffCicliEsecEntity>,
  ) {}

  async create(
    data: EpsNestjsOrpEffCicliEsec,
  ): Promise<EpsNestjsOrpEffCicliEsec> {
    const persistenceModel = EpsNestjsOrpEffCicliEsecMapper.toPersistence(data);
    const newEntity = await this.epsNestjsOrpEffCicliEsecRepository.save(
      this.epsNestjsOrpEffCicliEsecRepository.create(persistenceModel),
    );
    return EpsNestjsOrpEffCicliEsecMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    user,
  }: {
    filterOptions?: Array<FilterDto<EpsNestjsOrpEffCicliEsec>> | null;
    sortOptions?: Array<SortDto<EpsNestjsOrpEffCicliEsecDto>> | null;
    paginationOptions: IPaginationOptions;
    user: UserEntity | null;
  }): Promise<{
    data: { totaleTempoOperatore: number; list: EpsNestjsOrpEffCicliEsec[] };
    count: number;
  }> {
    // --- Logica per determinare la data da usare ---
    const today = new Date(); // Data odierna di default
    let targetDateInizio = today; // Inizializza la data target con oggi
    let targetDateFine = today;

    // Cerca il filtro per la data specifica in filterOptions
    // Assumiamo che il campo nel filtro si chiami 'dataRiferimento'
    const dateFilterInizio = filterOptions?.find(
      (filter) => filter.columnName === 'DATA_INIZIO',
    );
    const dateFilterFine = filterOptions?.find(
      (filter) => filter.columnName === 'DATA_FINE',
    );

    if (dateFilterInizio?.value) {
      // Se il filtro esiste e ha un valore, prova a usarlo come data
      const parsedDate = new Date(dateFilterInizio.value);
      // Verifica se la data parsata è valida
      if (!isNaN(parsedDate.getTime())) {
        targetDateInizio = parsedDate; // Usa la data dal filtro
      } else {
        console.warn(
          `Valore data non valido ricevuto dal filtro: ${dateFilterInizio.value}. Utilizzo data odierna.`,
        );
        // Opzionale: potresti voler lanciare un errore o gestire diversamente
      }
    }
    if (dateFilterFine?.value) {
      // Se il filtro esiste e ha un valore, prova a usarlo come data
      const parsedDate = new Date(dateFilterFine.value);
      // Verifica se la data parsata è valida
      if (!isNaN(parsedDate.getTime())) {
        targetDateFine = parsedDate; // Usa la data dal filtro
      } else {
        console.warn(
          `Valore data non valido ricevuto dal filtro: ${dateFilterFine.value}. Utilizzo data odierna.`,
        );
        // Opzionale: potresti voler lanciare un errore o gestire diversamente
      }
    }

    const entitiesSql = this.epsNestjsOrpEffCicliEsecRepository
      .createQueryBuilder('epsNestjsOrpEffCicliEsec')
      .innerJoinAndSelect('epsNestjsOrpEffCicliEsec.operatori', 'operatori')
      .where('epsNestjsOrpEffCicliEsec.COD_OP =:COD_OP', {
        COD_OP: user?.COD_OP,
      })
      .andWhere(
        '(TRUNC(epsNestjsOrpEffCicliEsec.DATA_INIZIO) <= TRUNC(:tFine) AND TRUNC(epsNestjsOrpEffCicliEsec.DATA_FINE) >= TRUNC(:tInizio))',
        {
          tInizio: targetDateInizio,
          tFine: targetDateFine,
        },
      );
    // .offset((paginationOptions.page - 1) * paginationOptions.limit)
    // .limit(paginationOptions.limit);

    if (sortOptions) {
      applicaSort('epsNestjsOrpEffCicliEsec', entitiesSql, sortOptions);
    }

    const entitiesAndCount = await entitiesSql.getManyAndCount();

    const totaleTempoOperatore = entitiesAndCount[0].reduce(
      (accumulator, item) => {
        // Convert the current item's value to a Decimal instance
        const valueToAdd = item?.TEMPO_OPERATORE || 0;
        // Use the library's 'plus' method for addition
        return accumulator.plus(valueToAdd);
      },
      new Decimal(0), // Initialize the accumulator with Decimal(0)
    );

    const list = entitiesAndCount[0].map((entity) =>
      EpsNestjsOrpEffCicliEsecMapper.toDomain(entity),
    );

    return {
      data: {
        totaleTempoOperatore: totaleTempoOperatore.toNumber(),
        list,
      },
      count: entitiesAndCount[1],
    };
  }

  async findById(
    id: EpsNestjsOrpEffCicliEsec['id'],
  ): Promise<NullableType<EpsNestjsOrpEffCicliEsec>> {
    const entity = await this.epsNestjsOrpEffCicliEsecRepository.findOne({
      where: { id },
    });

    return entity ? EpsNestjsOrpEffCicliEsecMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: EpsNestjsOrpEffCicliEsec['id'][],
  ): Promise<EpsNestjsOrpEffCicliEsec[]> {
    const entities = await this.epsNestjsOrpEffCicliEsecRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) =>
      EpsNestjsOrpEffCicliEsecMapper.toDomain(entity),
    );
  }

  async update(
    id: EpsNestjsOrpEffCicliEsec['id'],
    payload: Partial<EpsNestjsOrpEffCicliEsec>,
  ): Promise<EpsNestjsOrpEffCicliEsec> {
    const entity = await this.epsNestjsOrpEffCicliEsecRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.epsNestjsOrpEffCicliEsecRepository.save(
      this.epsNestjsOrpEffCicliEsecRepository.create(
        EpsNestjsOrpEffCicliEsecMapper.toPersistence({
          ...EpsNestjsOrpEffCicliEsecMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return EpsNestjsOrpEffCicliEsecMapper.toDomain(updatedEntity);
  }

  async remove(id: EpsNestjsOrpEffCicliEsec['id']): Promise<void> {
    await this.epsNestjsOrpEffCicliEsecRepository.delete(id);
  }
}
