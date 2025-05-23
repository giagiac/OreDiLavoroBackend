import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Decimal from 'decimal.js';
import { In, Repository } from 'typeorm';
import { User } from '../../../../../users/domain/user';
import { applicaSort, FilterDto, SortDto } from '../../../../../utils/dto/filter-column';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { EpsNestjsOrpEffCicliEsec } from '../../../../domain/eps-nestjs-orp-eff-cicli-esec';
import { EpsNestjsOrpEffCicliEsecDto } from '../../../../dto/esp-nestjs-orp-eff-cicli-esec.dto';
import { EpsNestjsOrpEffCicliEsecRepository } from '../../eps-nestjs-orp-eff-cicli-esec.repository';
import { EpsNestjsOrpEffCicliEsecEntity } from '../entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { EpsNestjsOrpEffCicliEsecMapper } from '../mappers/eps-nestjs-orp-eff-cicli-esec.mapper';

@Injectable()
export class EpsNestjsOrpEffCicliEsecRelationalRepository implements EpsNestjsOrpEffCicliEsecRepository {
  constructor(
    @InjectRepository(EpsNestjsOrpEffCicliEsecEntity)
    private readonly epsNestjsOrpEffCicliEsecRepository: Repository<EpsNestjsOrpEffCicliEsecEntity>,
  ) {}

  async create(data: EpsNestjsOrpEffCicliEsec): Promise<EpsNestjsOrpEffCicliEsec> {
    const persistenceModel = EpsNestjsOrpEffCicliEsecMapper.toPersistence(data);
    const newEntity = await this.epsNestjsOrpEffCicliEsecRepository.save(this.epsNestjsOrpEffCicliEsecRepository.create(persistenceModel));
    return EpsNestjsOrpEffCicliEsecMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    user,
  }: {
    filterOptions?: Array<FilterDto<EpsNestjsOrpEffCicliEsecDto>> | null;
    sortOptions?: Array<SortDto<EpsNestjsOrpEffCicliEsecDto>> | null;
    paginationOptions: IPaginationOptions;
    user: User | null;
  }): Promise<{
    data: {
      targetDateInizio: Date;
      totaleTempoOperatore: number;
      list: EpsNestjsOrpEffCicliEsec[];
    };
    count: number;
  }> {
    // --- Logica per determinare la data da usare ---
    const today = new Date(); // Data odierna di default
    let targetDateInizio = today; // Inizializza la data target con oggi
    let targetDateFine = today;

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

    const entitiesSql = this.epsNestjsOrpEffCicliEsecRepository
      .createQueryBuilder('epsNestjsOrpEffCicliEsec')
      .innerJoinAndSelect('epsNestjsOrpEffCicliEsec.operatori', 'operatori')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.orpEffCicli', 'orpEffCicli')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.epsNestjsOrpEffCicliEsecChild', 'epsNestjsOrpEffCicliEsecChild')
      // per ora non serve mi baso su HYPSERV_REQ2_COD_CHIAVE e APP_REQ3_HYPSERV_COD_CHIAVE
      // .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.hypServReq2', 'hypServReq2')
      // .leftJoinAndSelect(
      //   'epsNestjsOrpEffCicliEsec.appReq3HypServ',
      //   'appReq3HypServ',
      // )
      .leftJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
      .leftJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
      .leftJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
      .leftJoinAndSelect('ordCliRighe.cf', 'cf')
      .leftJoinAndSelect('ordCliRighe.ordCli', 'ordCli')
      .leftJoinAndSelect('ordCli.cfComm', 'cfComm')
      .leftJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')
      .select()
      .addSelect(
        `TO_CHAR("ordCliRighe".DATA_DOC, 'YY') || "x1TrasCodici".CODICE2 || "orpEff".NUM_DOC || '-' || "orpEffCicli".NUM_RIGA`,
        'CODICE_BREVE',
      ) // Using raw SQL for concatenation and formatted date
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
        return accumulator.plus(new Decimal(valueToAdd.toString()));
      },
      new Decimal(0), // Initialize the accumulator with Decimal(0)
    );

    const list = entitiesAndCount[0].map((entity) => EpsNestjsOrpEffCicliEsecMapper.toDomain(entity));

    return {
      data: {
        totaleTempoOperatore: totaleTempoOperatore.toNumber(),
        list,
        targetDateInizio,
      },
      count: entitiesAndCount[1],
    };
  }

  async findById(id: EpsNestjsOrpEffCicliEsec['id']): Promise<NullableType<EpsNestjsOrpEffCicliEsec>> {
    const entity = await this.epsNestjsOrpEffCicliEsecRepository.findOne({
      where: { id },
    });

    return entity ? EpsNestjsOrpEffCicliEsecMapper.toDomain(entity) : null;
  }

  async findByIds(ids: EpsNestjsOrpEffCicliEsec['id'][]): Promise<EpsNestjsOrpEffCicliEsec[]> {
    const entities = await this.epsNestjsOrpEffCicliEsecRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => EpsNestjsOrpEffCicliEsecMapper.toDomain(entity));
  }

  async update(id: EpsNestjsOrpEffCicliEsec['id'], payload: Partial<EpsNestjsOrpEffCicliEsec>): Promise<EpsNestjsOrpEffCicliEsec> {
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
