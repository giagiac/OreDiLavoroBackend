import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Decimal from 'decimal.js';
import { In, Repository } from 'typeorm';
import { EpsNestjsOrpEffCicliEsecChildEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esec-children/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec-child.entity';
import { applicaSort, FilterDto, SortDto } from '../../../../../utils/dto/filter-column';
import { NullableType } from '../../../../../utils/types/nullable.type';
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
    @InjectRepository(EpsNestjsOrpEffCicliEsecChildEntity)
    private readonly epsNestjsOrpEffCicliEsecChildRepository: Repository<EpsNestjsOrpEffCicliEsecChildEntity>,
  ) {}

  async create(data: EpsNestjsOrpEffCicliEsec): Promise<EpsNestjsOrpEffCicliEsec> {
    const persistenceModel = EpsNestjsOrpEffCicliEsecMapper.toPersistence(data);
    const newEntity = await this.epsNestjsOrpEffCicliEsecRepository.save(this.epsNestjsOrpEffCicliEsecRepository.create(persistenceModel));
    return EpsNestjsOrpEffCicliEsecMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
  }: {
    filterOptions?: Array<FilterDto<EpsNestjsOrpEffCicliEsecDto>> | null;
    sortOptions?: Array<SortDto<EpsNestjsOrpEffCicliEsecDto>> | null;
  }): Promise<{
    data: {
      targetDateInizio: Date;
      totaleTempoOperatore: number;
      list: EpsNestjsOrpEffCicliEsec[];
    };
  }> {
    // --- Logica per determinare la data da usare ---
    const today = new Date(); // Data odierna di default
    let targetDateInizio = today; // Inizializza la data target con oggi
    let targetDateFine = today;

    // Cerca il filtro per la data specifica in filterOptions
    // Assumiamo che il campo nel filtro si chiami 'dataRiferimento'
    const COD_OP = filterOptions?.find((filter) => filter.columnName === 'COD_OP');
    const dateFilterInizio = filterOptions?.find((filter) => filter.columnName === 'DATA_INIZIO');
    const dateFilterFine = filterOptions?.find((filter) => filter.columnName === 'DATA_FINE');
    const id = filterOptions?.find((filter) => filter.columnName === 'id'); // chiamata

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
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.artAna', 'artAna')
      .leftJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
      .leftJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
      .leftJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
      .leftJoinAndSelect('ordCliRighe.cf', 'cf')
      .leftJoinAndSelect('ordCliRighe.ordCli', 'ordCli')
      .leftJoinAndSelect('ordCli.cfComm', 'cfComm')
      .leftJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')
      .select()
      .addSelect(
        `TO_CHAR("orpEff".DATA_DOC, 'YY') || "x1TrasCodici".CODICE2 || "orpEff".NUM_DOC || '-' || "orpEffCicli".NUM_RIGA`,
        'CODICE_BREVE',
      ) // Using raw SQL for concatenation and formatted date
      .andWhere('epsNestjsOrpEffCicliEsec.COD_OP =:COD_OP', {
        COD_OP: COD_OP?.value,
      })
      .andWhere(
        '(TRUNC(epsNestjsOrpEffCicliEsec.DATA_INIZIO) <= TRUNC(:tFine) AND TRUNC(epsNestjsOrpEffCicliEsec.DATA_FINE) >= TRUNC(:tInizio))',
        {
          tInizio: targetDateInizio,
          tFine: targetDateFine,
        },
      );

    if (id?.value) {
      entitiesSql.andWhere('epsNestjsOrpEffCicliEsec.id = :id', {
        id: id.value,
      });
    }

    if (sortOptions) {
      applicaSort('epsNestjsOrpEffCicliEsec', entitiesSql, sortOptions);
    }

    const entitiesAndCount = await entitiesSql.getMany();

    let totaleTempoOperatore = entitiesAndCount.reduce(
      (accumulator, item) => {
        // Convert the current item's value to a Decimal instance
        const valueToAdd = item?.TEMPO_OPERATORE || 0;
        // Use the library's 'plus' method for addition
        return accumulator.plus(new Decimal(valueToAdd.toString()));
      },
      new Decimal(0), // Initialize the accumulator with Decimal(0)
    );

    for (const entity of entitiesAndCount) {
      const entitiesChildSql = this.epsNestjsOrpEffCicliEsecChildRepository
        .createQueryBuilder('epsNestjsOrpEffCicliEsecChild')
        .innerJoinAndSelect('epsNestjsOrpEffCicliEsecChild.operatori', 'operatori')
        .leftJoinAndSelect('epsNestjsOrpEffCicliEsecChild.orpEffCicli', 'orpEffCicli')
        .leftJoinAndSelect('epsNestjsOrpEffCicliEsecChild.artAna', 'artAna')
        .leftJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
        .leftJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
        .leftJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
        .leftJoinAndSelect('ordCliRighe.cf', 'cf')
        .leftJoinAndSelect('ordCliRighe.ordCli', 'ordCli')
        .leftJoinAndSelect('ordCli.cfComm', 'cfComm')
        .leftJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')
        .select()
        .addSelect(
          `TO_CHAR("orpEff".DATA_DOC, 'YY') || "x1TrasCodici".CODICE2 || "orpEff".NUM_DOC || '-' || "orpEffCicli".NUM_RIGA`,
          'CODICE_BREVE',
        ) // Using raw SQL for concatenation and formatted date
        .andWhere('epsNestjsOrpEffCicliEsecChild.COD_OP =:COD_OP', { COD_OP: COD_OP?.value })
        .andWhere(
          '(TRUNC(epsNestjsOrpEffCicliEsecChild.DATA_INIZIO) <= TRUNC(:tFine) AND TRUNC(epsNestjsOrpEffCicliEsecChild.DATA_FINE) >= TRUNC(:tInizio))',
          {
            tInizio: targetDateInizio,
            tFine: targetDateFine,
          },
        )
        .andWhere('epsNestjsOrpEffCicliEsecChild.idfk = :idfk', {
          idfk: entity.id,
        });

      const entitiesChild = await entitiesChildSql.getMany();

      const totaleTempoOperatoreChild = entitiesChild.reduce(
        (accumulator, item) => {
          // Convert the current item's value to a Decimal instance
          const valueToAdd = item?.TEMPO_OPERATORE || 0;
          // Use the library's 'plus' method for addition
          return accumulator.plus(new Decimal(valueToAdd.toString()));
        },
        new Decimal(0), // Initialize the accumulator with Decimal(0)
      );

      // Accumula nel totale generale
      totaleTempoOperatore = totaleTempoOperatore.plus(totaleTempoOperatoreChild);

      entity.epsNestjsOrpEffCicliEsecChild = entitiesChild;
    }

    const list = entitiesAndCount.map((entity) => EpsNestjsOrpEffCicliEsecMapper.toDomain(entity));

    return {
      data: {
        totaleTempoOperatore: totaleTempoOperatore.toNumber(),
        list,
        targetDateInizio,
      },
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
    await this.epsNestjsOrpEffCicliEsecRepository.manager.transaction(async (trans) => {
      const entity = await trans.getRepository(EpsNestjsOrpEffCicliEsecEntity).delete({ id });
      // Assuming EpsNestjsOrpEffCicliEsecChildEntity is related and should also be deleted
      const entityChild = await trans.getRepository(EpsNestjsOrpEffCicliEsecChildEntity).delete({ idfk: Number(id) });
    });
  }
}
