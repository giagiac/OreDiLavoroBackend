import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Decimal from 'decimal.js';
import { In, Repository } from 'typeorm';
import { applicaSort, FilterDto, SortDto } from '../../../../../utils/dto/filter-column';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { EpsNestjsOrpEffCicliEsecChild } from '../../../../domain/eps-nestjs-orp-eff-cicli-esec-child';
import { EpsNestjsOrpEffCicliEsecChildDto } from '../../../../dto/eps-nestjs-orp-eff-cicli-esec-child.dto';
import { EpsNestjsOrpEffCicliEsecChildRepository } from '../../eps-nestjs-orp-eff-cicli-esec-child.repository';
import { EpsNestjsOrpEffCicliEsecChildEntity } from '../entities/eps-nestjs-orp-eff-cicli-esec-child.entity';
import { EpsNestjsOrpEffCicliEsecChildMapper } from '../mappers/eps-nestjs-orp-eff-cicli-esec-child.mapper';

@Injectable()
export class EpsNestjsOrpEffCicliEsecChildRelationalRepository implements EpsNestjsOrpEffCicliEsecChildRepository {
  constructor(
    @InjectRepository(EpsNestjsOrpEffCicliEsecChildEntity)
    private readonly epsNestjsOrpEffCicliEsecChildRepository: Repository<EpsNestjsOrpEffCicliEsecChildEntity>,
  ) {}

  async create(data: EpsNestjsOrpEffCicliEsecChild): Promise<EpsNestjsOrpEffCicliEsecChild> {
    const persistenceModel = EpsNestjsOrpEffCicliEsecChildMapper.toPersistence(data);
    const newEntity = await this.epsNestjsOrpEffCicliEsecChildRepository.save(
      this.epsNestjsOrpEffCicliEsecChildRepository.create(persistenceModel),
    );
    return EpsNestjsOrpEffCicliEsecChildMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
  }: {
    filterOptions?: Array<FilterDto<EpsNestjsOrpEffCicliEsecChildDto>> | null;
    sortOptions?: Array<SortDto<EpsNestjsOrpEffCicliEsecChildDto>> | null;
  }): Promise<{
    data: {
      targetDateInizio: Date;
      totaleTempoOperatore: number;
      list: EpsNestjsOrpEffCicliEsecChild[];
    };
  }> {
    // --- Logica per determinare la data da usare ---
    const today = new Date(); // Data odierna di default
    let targetDateInizio = today; // Inizializza la data target con oggi
    let targetDateFine = today;

    const COD_OP = filterOptions?.find((f) => f.columnName === 'COD_OP');
    // Cerca il filtro per la data specifica in filterOptions
    // Assumiamo che il campo nel filtro si chiami 'dataRiferimento'
    const dateFilterInizio = filterOptions?.find((filter) => filter.columnName === 'DATA_INIZIO');
    const dateFilterFine = filterOptions?.find((filter) => filter.columnName === 'DATA_FINE');

    if (dateFilterInizio?.value) {
      // Se il filtro esiste e ha un valore, prova a usarlo come data
      const parsedDate = new Date(dateFilterInizio.value);
      // Verifica se la data parsata è valida
      if (!isNaN(parsedDate.getTime())) {
        targetDateInizio = parsedDate; // Usa la data dal filtro
      } else {
        console.warn(`Valore data non valido ricevuto dal filtro: ${dateFilterInizio.value}. Utilizzo data odierna.`);
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
        console.warn(`Valore data non valido ricevuto dal filtro: ${dateFilterFine.value}. Utilizzo data odierna.`);
        // Opzionale: potresti voler lanciare un errore o gestire diversamente
      }
    }

    const entitiesSql = this.epsNestjsOrpEffCicliEsecChildRepository
      .createQueryBuilder('epsNestjsOrpEffCicliEsecChild')
      .select()
      .where('epsNestjsOrpEffCicliEsecChild.COD_OP =:COD_OP', {
        COD_OP: COD_OP?.value,
      })
      .andWhere(
        '(TRUNC(epsNestjsOrpEffCicliEsecChild.DATA_INIZIO) <= TRUNC(:tFine) AND TRUNC(epsNestjsOrpEffCicliEsecChild.DATA_FINE) >= TRUNC(:tInizio))',
        {
          tInizio: targetDateInizio,
          tFine: targetDateFine,
        },
      );

    if (sortOptions) {
      applicaSort('epsNestjsOrpEffCicliEsecChild', entitiesSql, sortOptions);
    }

    const entitiesAndCount = await entitiesSql.getMany();

    const totaleTempoOperatore = entitiesAndCount.reduce(
      (accumulator, item) => {
        // Convert the current item's value to a Decimal instance
        const valueToAdd = item?.TEMPO_OPERATORE || 0;
        // Use the library's 'plus' method for addition
        return accumulator.plus(new Decimal(valueToAdd.toString()));
      },
      new Decimal(0), // Initialize the accumulator with Decimal(0)
    );

    const list = entitiesAndCount.map((entity) => EpsNestjsOrpEffCicliEsecChildMapper.toDomain(entity));

    return {
      data: {
        totaleTempoOperatore: totaleTempoOperatore.toNumber(),
        list,
        targetDateInizio,
      }
    };
  }

  async findById(id: EpsNestjsOrpEffCicliEsecChild['id']): Promise<NullableType<EpsNestjsOrpEffCicliEsecChild>> {
    const entity = await this.epsNestjsOrpEffCicliEsecChildRepository.findOne({
      where: { id },
    });

    return entity ? EpsNestjsOrpEffCicliEsecChildMapper.toDomain(entity) : null;
  }

  async findByIds(ids: EpsNestjsOrpEffCicliEsecChild['id'][]): Promise<EpsNestjsOrpEffCicliEsecChild[]> {
    const entities = await this.epsNestjsOrpEffCicliEsecChildRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => EpsNestjsOrpEffCicliEsecChildMapper.toDomain(entity));
  }

  async update(
    id: EpsNestjsOrpEffCicliEsecChild['id'],
    payload: Partial<EpsNestjsOrpEffCicliEsecChild>,
  ): Promise<EpsNestjsOrpEffCicliEsecChild> {
    const entity = await this.epsNestjsOrpEffCicliEsecChildRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.epsNestjsOrpEffCicliEsecChildRepository.save(
      this.epsNestjsOrpEffCicliEsecChildRepository.create(
        EpsNestjsOrpEffCicliEsecChildMapper.toPersistence({
          ...EpsNestjsOrpEffCicliEsecChildMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return EpsNestjsOrpEffCicliEsecChildMapper.toDomain(updatedEntity);
  }

  async remove(id: EpsNestjsOrpEffCicliEsecChild['id']): Promise<void> {
    await this.epsNestjsOrpEffCicliEsecChildRepository.delete(id);
  }
}
