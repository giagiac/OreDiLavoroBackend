import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import Decimal from 'decimal.js';
import { EntityManager, In, Repository } from 'typeorm';
import { AppReq3HypServEntity } from '../../../../../app-req3-hyp-servs/infrastructure/persistence/relational/entities/app-req3-hyp-serv.entity';
import { ArticoliCostiCfCommEntity } from '../../../../../articoli-costi-cf-comm/infrastructure/persistence/relational/entities/articoli-costi-cf-comm.entity';
import { ArticoliCostiCfEntity } from '../../../../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';
import { CfEntity, DEFAULT } from '../../../../../cfs/infrastructure/persistence/relational/entities/cf.entity';
import { EpsNestjsDestinazioniEntity } from '../../../../../eps-nestjs-destinazionis/infrastructure/persistence/relational/entities/eps-nestjs-destinazioni.entity';
import { TipoTrasferta } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/domain/eps-nestjs-orp-eff-cicli-esec';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { HypServReq2Entity } from '../../../../../hyp-serv-req2/infrastructure/persistence/relational/entities/hyp-serv-req2.entity';
import { TempoOperatoreToSessantesimiTransformer } from '../../../../../utils/transformers/tempo-in-human-readable';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ScheduleTasks } from '../../../../domain/schedule-tasks';
import { ScheduleTasksRepository } from '../../schedule-tasks.repository';
import {
  ApiResponse,
  APP_REQ3_HYPSERV_TIPO_RICHIESTA,
  HYPSERV_REQ2_TIPO_RICHIESTA,
  ScheduleTasksEntity,
  separator,
  TIPO_ERRORI_SYNC,
} from '../entities/schedule-tasks.entity';
import { ScheduleTasksMapper } from '../mappers/schedule-tasks.mapper';

const transformer = new TempoOperatoreToSessantesimiTransformer();

const hypservEsecuzioniDefaultParams = [
  '', //Parametro 1 - DOC_RIGA_ID del Ciclo oppure Codice Breve del CICLO
  '', //Parametro 2 - Codice Operatore
  '0', //Parametro 3 - Flag che indica se bisogna cercare il record di esec_matt (0_No 1_Si, e deve esistere 2_Si, e può non esistere, in tal caso usa i dati di questa richiesta)|
  '', //Parametro 4 - Data-Ora inizio (usato nel caso manchi il record di esec_matt o quando non si vuole cercare il record stesso) (stringa da 12 caratteri contenenti anno(4), mese(2), giorno(2), ore(2), minuti(2)
  '', //Parametro 5 - Data-Ora fine (stringa da 12 caratteri contenenti anno(4), mese(2), giorno(2), ore(2), minuti(2)|
  '0', //Parametro 6 - Quantità prodotta
  '0', //Parametro 7 - Scarti |
  '0', //Parametro 8 - Flag chiusura forzata ciclo (0_No 1_Si)|
  '', //Parametro 9 - Codice centro effettivo
  '', //Parametro 10 - Codice macchina effettiva
  '1', //Parametro 11 - Numero addetti
  '1', //Parametro 12 - Codice causale di produzione
  '0', //Parametro 13 - Flag chiusura provvisoria (O_No 1_Si)
  '0', //Parametro 14 - Flag per scarico eccedenze (solo se il flag "sempre proporzionale" di testata è SPENTO) (O_No 1_Si) |
  '0', //Parametro 15 - Flag per indicazione esecuzione "non conforme" (0_No 1_Si)
  '0', //Parametro 16 - Flag per chiudere il ciclo se la quantità prodotta raggiunta è sufficiente (quando "Chiusura forzata spento" ed opzione "Chiusura manuale dei cicli di lavoro" acceso (0_No 1_Si)
  '', //Parametro 17 - Note
  '1', //Parametro 18 - Flag che indica se utilizzare i parametri 18 e 19 per i tempi operatore-macchina (0_No 1_Si) * Modifica del 28.08.2023 con richiesta volante di Carraro
  '', //Parametro 19 - (se Parametro 18 = 1) Tempo operatore in minuti: Modifica del 28.08.2023 con richiesta volante di Carraro
  '', //Parametro 20 - (se Parametro 18 = 1) Tempo macchina in minuti # Modifica del 28.08.2023 con richiesta volante di Carraro
  '', //Parametro 21 - Tempo improduttivo in minuti
].map((it) => it + separator);

// prettier-ignore
const appReqComponentiDefaultParams = [
  'tv_row_head.DOC_ID=', '', separator, // 1
  '*', separator,
  'RV1', separator,
  'tv_row_riga.COD_ART_COMP=', '', separator, // 8
  'tv_row_riga.QUANT_DIST=', '', separator, // 11
];

@Injectable()
export class ScheduleTasksRelationalRepository implements ScheduleTasksRepository {
  constructor(
    @InjectRepository(ScheduleTasksEntity)
    private readonly scheduleTasksRepository: Repository<ScheduleTasksEntity>,
    @InjectRepository(EpsNestjsOrpEffCicliEsecEntity)
    private readonly epsNestjsOrpEffCicliEsecRepository: Repository<EpsNestjsOrpEffCicliEsecEntity>,
    @InjectRepository(ArticoliCostiCfEntity)
    private readonly articoliCostiCfRepository: Repository<ArticoliCostiCfEntity>,
    @InjectRepository(ArticoliCostiCfCommEntity)
    private readonly articoliCostiCfCommRepository: Repository<ArticoliCostiCfCommEntity>,
  ) {}

  async create(data: ScheduleTasks): Promise<ScheduleTasks> {
    const persistenceModel = ScheduleTasksMapper.toPersistence(data);
    const newEntity = await this.scheduleTasksRepository.save(this.scheduleTasksRepository.create(persistenceModel));
    return ScheduleTasksMapper.toDomain(newEntity);
  }

  async findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<ScheduleTasks[]> {
    const entities = await this.scheduleTasksRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ScheduleTasksMapper.toDomain(entity));
  }

  async findById(id: ScheduleTasks['id']): Promise<NullableType<ScheduleTasks>> {
    const entity = await this.scheduleTasksRepository.findOne({
      where: { id },
    });

    return entity ? ScheduleTasksMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ScheduleTasks['id'][]): Promise<ScheduleTasks[]> {
    const entities = await this.scheduleTasksRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ScheduleTasksMapper.toDomain(entity));
  }

  async update(id: ScheduleTasks['id'], payload: Partial<ScheduleTasks>): Promise<ScheduleTasks> {
    const entity = await this.scheduleTasksRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.scheduleTasksRepository.save(
      this.scheduleTasksRepository.create(
        ScheduleTasksMapper.toPersistence({
          ...ScheduleTasksMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ScheduleTasksMapper.toDomain(updatedEntity);
  }

  async remove(id: ScheduleTasks['id']): Promise<void> {
    await this.scheduleTasksRepository.delete(id);
  }

  // -------------------------------------------------------------

  cfSedePrincipale: CfEntity;

  async findAllEsec(id: ScheduleTasks['id'] | null): Promise<any> {
    // const esecs = this.epsNestjsOrpEffCicliEsecEntity.findAndCount()
    // return esecs;

    return this.epsNestjsOrpEffCicliEsecRepository.manager.transaction(async (manager) => {
      const entitiesSqlCfSedePrincipale = manager
        .getRepository(CfEntity)
        .createQueryBuilder()
        .where('COD_CF=:COD_CF', { COD_CF: process.env.GOOGLE_COD_CF_SEDE });

      const cfEntity = await entitiesSqlCfSedePrincipale.getOne();
      if (!cfEntity) {
        throw new Error('Cf sede principale non definita...');
      }
      this.cfSedePrincipale = cfEntity;

      await this.processInSede(manager, id);
      await this.processInGiornata(manager, id);
      await this.processInGiornataDopo21(manager, id);
      await this.processFuoriSedeAndata(manager, id);
      await this.processFuoriSedeRitorno(manager, id);

      await this.processAncoraInMissione0(manager, id);
      await this.processAncoraInMissione10(manager, id);
      await this.processAncoraInMissione20(manager, id);
      await this.processAncoraInMissione30(manager, id);
      await this.processAncoraInMissione40(manager, id);
      // await this.processStep1KmAutista(manager, id);

      return {
        data: {
          list: [],
        },
      };
    });
  }

  // -------------------------------------------------------------------------------------------------------------------

  private getBaseEsecuzioniQueryBuilder(manager: EntityManager, tipoTrasferta: TipoTrasferta, id: string | null) {
    const entitiesSql = manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder('epsNestjsOrpEffCicliEsec')
      .select()
      .andWhere('"epsNestjsOrpEffCicliEsec"."HYPSERV_REQ2_COD_CHIAVE" IS NULL')
      .orderBy('"epsNestjsOrpEffCicliEsec"."id"', 'ASC');

    entitiesSql.andWhere('"epsNestjsOrpEffCicliEsec"."TIPO_TRASFERTA" = :tipoTrasferta', { tipoTrasferta });

    if (id) {
      entitiesSql.andWhere('"epsNestjsOrpEffCicliEsec"."id" = :id', { id });
    }

    return entitiesSql;
  }

  private getBaseComponentiQueryBuilder(manager: EntityManager, tipoTrasferta: TipoTrasferta, id: string | null) {
    const entitiesSql = manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder('epsNestjsOrpEffCicliEsec')

      .innerJoinAndSelect('epsNestjsOrpEffCicliEsec.operatori', 'operatori')
      .innerJoinAndSelect('operatori.user', 'user')
      .innerJoinAndSelect('user.role', 'role')

      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.hypServReq2', 'hypServReq2')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.appReq3HypServ', 'appReq3HypServ')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.orpEffCicli', 'orpEffCicli')

      .leftJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
      .leftJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
      .leftJoinAndSelect('ordCliRighe.ordCli', 'ordCli')
      .leftJoinAndSelect('ordCli.cfComm', 'cfComm')
      .leftJoinAndSelect('ordCliRighe.cf', 'cf')

      .leftJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
      .leftJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')

      .select()
      .andWhere('"epsNestjsOrpEffCicliEsec"."APP_REQ3_HYPSERV_COD_CHIAVE" IS NULL')
      .orderBy('"epsNestjsOrpEffCicliEsec"."DOC_RIGA_ID"', 'ASC')
      .orderBy('"epsNestjsOrpEffCicliEsec"."COD_ART"', 'ASC')
      .orderBy('"epsNestjsOrpEffCicliEsec"."DATA_INIZIO"', 'ASC');

    entitiesSql.andWhere('"epsNestjsOrpEffCicliEsec"."TIPO_TRASFERTA" = :tipoTrasferta', { tipoTrasferta });

    if (id) {
      entitiesSql.andWhere('"epsNestjsOrpEffCicliEsec"."id" = :id', { id });
    }

    return entitiesSql;
  }

  // -------------------------------------------------------------------------------------------------------------------

  async processGenericTrasferta(xVolte: number, tipoTrasferta: TipoTrasferta, manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    const esecuzioni = await this.getBaseEsecuzioniQueryBuilder(manager, tipoTrasferta, id).getMany();

    for (const entity of esecuzioni) {
      // genero solo l'esecuzione
      await this.GeneroEsecuzioneOperatore(manager, entity);
    }

    const componenti = await this.getBaseComponentiQueryBuilder(manager, tipoTrasferta, id).getMany();

    if (componenti.length > 0) {
      let prevGroup = ''; // al primo passaggio genero il componente sempre
      let prevId = '';

      for (const entity of componenti) {
        if (
          entity.DOC_RIGA_ID == null ||
          entity.COD_OP == null ||
          entity.DATA_INIZIO == null ||
          entity.DATA_FINE == null ||
          entity.TIPO_TRASFERTA == null
        ) {
          await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DATI_SET_MINIMO, manager, entity.id);
          return;
        }

        const currGroup = entity.DOC_RIGA_ID + entity.COD_ART + entity.DATA_INIZIO?.toISOString().substring(0, 10) || ''; // della data prendo solo anno mese giorno
        if (currGroup !== prevGroup) {
          prevGroup = currGroup;
          prevId = entity.id;
          // Genero componente COSTO trasferta
          await this.GeneroComponenteCicloCostoOperatoreTrasferta(manager, entity);
          // 2 volte perché in_giornata è prevista ANDATA e RITORNO
          await this.GeneroComponenteCicloCostoKmTrasferta(xVolte, manager, entity);
        } else {
          // Indico i successivi operatori del gruppo di viaggio come processati - con lo stesso id dell'autista
          const update = await manager
            .getRepository(EpsNestjsOrpEffCicliEsecEntity)
            .createQueryBuilder()
            .update()
            .set({
              APP_REQ3_HYPSERV_COD_CHIAVE: prevId,
            })
            .where('id = :id', { id: entity.id })
            .execute();
        }
      }
    }
  }

  // -------------------------------------------------------------------------------------------------------------------

  async processInSede(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    const esecuzioni = await this.getBaseEsecuzioniQueryBuilder(manager, 'in_sede', id).getMany();

    for (const entity of esecuzioni) {
      // genero solo l'esecuzione
      await this.GeneroEsecuzioneOperatore(manager, entity);
    }
  }

  async processInGiornata(manager: EntityManager, id: string | null): Promise<void> {
    await this.processGenericTrasferta(2, 'in_giornata', manager, id);
  }

  async processInGiornataDopo21(manager: EntityManager, id: string | null): Promise<void> {
    await this.processGenericTrasferta(2, 'in_giornata_dopo_21', manager, id);
  }

  async processFuoriSedeAndata(manager: EntityManager, id: string | null): Promise<void> {
    await this.processGenericTrasferta(1, 'fuori_sede_andata', manager, id);
  }

  async processFuoriSedeRitorno(manager: EntityManager, id: string | null): Promise<void> {
    await this.processGenericTrasferta(1, 'fuori_sede_ritorno', manager, id);
  }

  async processAncoraInMissione0(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    const entitiesSql = await this.getBaseEsecuzioniQueryBuilder(manager, 'ancora_in_missione_0', id);

    const entities = await entitiesSql.getMany();

    for (const entity of entities) {
      // genero solo l'esecuzione
      await this.GeneroEsecuzioneOperatore(manager, entity);
    }
  }

  async processAncoraInMissione10(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    const entitiesSql = await this.getBaseEsecuzioniQueryBuilder(manager, 'ancora_in_missione_10', id);

    const entities = await entitiesSql.getMany();

    for (const entity of entities) {
      // genero solo l'esecuzione
      await this.GeneroEsecuzioneOperatore(manager, entity);
      await this.GeneroComponenteKmLiberi('10', manager, entity);
    }
  }

  async processAncoraInMissione20(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    const entitiesSql = await this.getBaseEsecuzioniQueryBuilder(manager, 'ancora_in_missione_20', id);

    const entities = await entitiesSql.getMany();

    for (const entity of entities) {
      // genero solo l'esecuzione
      await this.GeneroEsecuzioneOperatore(manager, entity);
      await this.GeneroComponenteKmLiberi('20', manager, entity);
    }
  }

  async processAncoraInMissione30(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    const entitiesSql = await this.getBaseEsecuzioniQueryBuilder(manager, 'ancora_in_missione_30', id);

    const entities = await entitiesSql.getMany();

    for (const entity of entities) {
      // genero solo l'esecuzione
      await this.GeneroEsecuzioneOperatore(manager, entity);
      await this.GeneroComponenteKmLiberi('30', manager, entity);
    }
  }

  async processAncoraInMissione40(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    const entitiesSql = await this.getBaseEsecuzioniQueryBuilder(manager, 'ancora_in_missione_40', id);

    const entities = await entitiesSql.getMany();

    for (const entity of entities) {
      // genero solo l'esecuzione
      await this.GeneroEsecuzioneOperatore(manager, entity);
      await this.GeneroComponenteKmLiberi('40', manager, entity);
    }
  }

  async processStep1KmAutista(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    const entitiesSql = await this.getBaseEsecuzioniQueryBuilder(manager, 'step1_KmAutista', id);

    const entities = await entitiesSql.getMany();

    for (const entity of entities) {
      // genero solo l'esecuzione
      // await this.GeneroComponenteCiclo(1, manager, entity);
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // ------------------------------- Genera il tempo in esecuzioni nei cicli -------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  async GeneroEsecuzioneOperatore(manager: EntityManager, entity: EpsNestjsOrpEffCicliEsecEntity) {
    if (
      entity.DOC_RIGA_ID == null ||
      entity.COD_OP == null ||
      entity.DATA_INIZIO == null ||
      entity.DATA_FINE == null ||
      entity.TEMPO_OPERATORE == null ||
      entity.TIPO_TRASFERTA == null
    ) {
      await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DATI_SET_MINIMO, manager, entity.id);
      return;
    }

    const max = await manager.getRepository(HypServReq2Entity).createQueryBuilder().select('MAX(PROGR) + 1', 'maxProgr').getRawOne();

    const result = await manager
      .getRepository(HypServReq2Entity)
      .createQueryBuilder()
      .insert()
      .into(HypServReq2Entity)
      .values([
        {
          UTENTE_FROM: entity.COD_OP,
          PROGR: max?.maxProgr || 1,
          COD_CHIAVE: entity.id,
          NUM_AZIENDA: entity.AZIENDA_ID,
          DATAORA_RICHIESTA: new Date(),
          COD_REQ2_HYPSERV: HYPSERV_REQ2_TIPO_RICHIESTA.ESECUZIONI,
          CAMPO_PARAMETRI: this.makeEsecuzioneOrpEffCicli(
            entity.DOC_RIGA_ID,
            entity.COD_OP,
            entity.DATA_INIZIO,
            entity.DATA_FINE,
            entity.TEMPO_OPERATORE,
            entity.TIPO_TRASFERTA,
          ),
        },
      ])
      .execute();

    const update = await manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder()
      .update()
      .set({ HYPSERV_REQ2_COD_CHIAVE: entity.id })
      .where('id = :id', { id: entity.id })
      .execute();
  }

  // -------------------------------------------------------------------------------------------------------------------
  // ------------------------ Genera il componente per il costo operatore trasferta ------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  async GeneroComponenteCicloCostoOperatoreTrasferta(manager: EntityManager, entity: EpsNestjsOrpEffCicliEsecEntity) {
    const max = await manager.getRepository(HypServReq2Entity).createQueryBuilder().select('MAX(PROGR) + 1', 'maxProgr').getRawOne();

    if (!entity.orpEffCicli || !entity.orpEffCicli.linkOrpOrd || entity.orpEffCicli.linkOrpOrd.length === 0) {
      await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.LINK_ORP_EFF, manager, entity.id);
      return;
    }

    const ordCliRighe = entity.orpEffCicli.linkOrpOrd[0].ordCliRighe;

    const cf = ordCliRighe?.cf;
    const ordCli = ordCliRighe?.ordCli;

    if (cf == null || ordCli == null) {
      await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.ORD_CLI_CF, manager, entity.id);
      return;
    }

    const CF_COMM_ID = cf.COD_CF + '_' + ordCli.NUM_SEDE;
    const COD_CF = cf.COD_CF;

    const COD_ART = await this.CercoEpsNestjsArticoliCosti(manager, CF_COMM_ID, COD_CF, entity.TIPO_TRASFERTA);

    if (COD_ART == null) {
      return await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.COD_ART_COSTI_CF_DEFAULT, manager, entity.id);
    }

    const componente = this.makeComponentiOrpEff(entity.orpEffCicli.DOC_ID, COD_ART, '1');

    const result = await manager
      .getRepository(AppReq3HypServEntity)
      .createQueryBuilder()
      .insert()
      .into(AppReq3HypServEntity)
      .values([
        {
          UTENTE_FROM: entity.COD_OP,
          PROGR: max?.maxProgr || 1,
          CHIAVE_ESTERNA: entity.id,
          NUM_AZIENDA: entity.AZIENDA_ID,
          DATAORA_RICHIESTA: new Date(),
          COD_REQ3_HYPSERV: APP_REQ3_HYPSERV_TIPO_RICHIESTA.COMPONENTI_ORP_EFF,
          CAMPO_PARAMETRI: componente,
        },
      ])
      .execute();

    const update = await manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder()
      .update()
      .set({
        APP_REQ3_HYPSERV_COD_CHIAVE: entity.id,
      })
      .where('id = :id', { id: entity.id })
      .execute();
  }

  // -------------------------------------------------------------------------------------------------------------------
  // ----------------------------- Genera il componente per il costo chilometrico --------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  async GeneroComponenteCicloCostoKmTrasferta(xVolte: number, manager: EntityManager, entity: EpsNestjsOrpEffCicliEsecEntity) {
    const max = await manager.getRepository(HypServReq2Entity).createQueryBuilder().select('MAX(PROGR) + 1', 'maxProgr').getRawOne();

    if (!entity.orpEffCicli || !entity.orpEffCicli.linkOrpOrd || entity.orpEffCicli.linkOrpOrd.length === 0) {
      await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.LINK_ORP_EFF, manager, entity.id);
      return;
    }

    const ordCliRighe = entity.orpEffCicli.linkOrpOrd[0].ordCliRighe;

    const cf = ordCliRighe?.cf;
    const cfComm = ordCliRighe?.ordCli?.cfComm;

    if (cf == null || cfComm == null) {
      await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.ORD_CLI_CF, manager, entity.id);
      return;
    }

    const STATO = cf?.STATO_CF || ''; // lo stato va preso sempre dalla testata
    let REGIONE = '';
    let PROVINCIA = '';
    let COMUNE = '';
    let CAP = '';
    let INDIRIZZO = '';

    if (cfComm?.NUM_SEDE != null) {
      // att.ne se è indicato NUM_SEDE allora è sicuro ci sia una destinazione
      REGIONE = '';
      PROVINCIA = cfComm.PROVINCIA_SEDE || '';
      COMUNE = cfComm.COMUNE_SEDE || '';
      CAP = cfComm.CAP_SEDE || '';
      INDIRIZZO = cfComm.INDI_SEDE || '';
    } else {
      REGIONE = '';
      PROVINCIA = cf?.PROVINCIA_CF || '';
      COMUNE = cf?.COMUNE_CF || '';
      CAP = cf?.CAP_CF || '';
      INDIRIZZO = cf?.INDI_CF || '';
    }

    if (INDIRIZZO == '' || COMUNE == '') {
      await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DESTINAZIONE_INCOMPLETA, manager, entity.id);
      return;
    }

    const COD_ART = entity.COD_ART; // caso in cui lo prendo dalla targa | att.ne andrà aggiunto uno e soltanto un COMPONENTE per ogni gruppo di lavoro

    if (COD_ART == null) {
      return await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.COD_ART_COSTI_CF_DEFAULT, manager, entity.id);
    }

    const km = await this.fetchGoogleDistanza(
      xVolte,
      manager,
      this.cfSedePrincipale,
      REGIONE,
      STATO, // att.ne va preso dalla testata del cliente - per le sedi commerciali funziona così
      PROVINCIA,
      COMUNE,
      CAP,
      INDIRIZZO,
    );

    console.info(`Km da CF_COMM: ${entity.id} -> ${km}`);

    const componente = this.makeComponentiOrpEff(entity.orpEffCicli.DOC_ID, COD_ART, km);

    const result = await manager
      .getRepository(AppReq3HypServEntity)
      .createQueryBuilder()
      .insert()
      .into(AppReq3HypServEntity)
      .values([
        {
          UTENTE_FROM: entity.COD_OP,
          PROGR: max?.maxProgr || 1,
          CHIAVE_ESTERNA: entity.id,
          NUM_AZIENDA: entity.AZIENDA_ID,
          DATAORA_RICHIESTA: new Date(),
          COD_REQ3_HYPSERV: APP_REQ3_HYPSERV_TIPO_RICHIESTA.COMPONENTI_ORP_EFF,
          CAMPO_PARAMETRI: componente,
        },
      ])
      .execute();

    const update = await manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder()
      .update()
      .set({
        APP_REQ3_HYPSERV_COD_CHIAVE: entity.id,
        KM: Number(km.replaceAll(',', '.')),
      })
      .where('id = :id', { id: entity.id })
      .execute();
  }

  // -------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------- Genera km liberi ---------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  async GeneroComponenteKmLiberi(km: string, manager: EntityManager, entity: EpsNestjsOrpEffCicliEsecEntity) {
    const max = await manager.getRepository(HypServReq2Entity).createQueryBuilder().select('MAX(PROGR) + 1', 'maxProgr').getRawOne();

    if (!entity.orpEffCicli || !entity.orpEffCicli.linkOrpOrd || entity.orpEffCicli.linkOrpOrd.length === 0) {
      await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.LINK_ORP_EFF, manager, entity.id);
      return;
    }

    const COD_ART = entity.COD_ART; // caso in cui lo prendo dalla targa | att.ne andrà aggiunto uno e soltanto un COMPONENTE per ogni gruppo di lavoro

    if (COD_ART == null) {
      return await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.COD_ART_COSTI_CF_DEFAULT, manager, entity.id);
    }

    console.info(`Km liberi: ${entity.id} -> ${km}`);

    const componente = this.makeComponentiOrpEff(entity.orpEffCicli.DOC_ID, COD_ART, km);

    const result = await manager
      .getRepository(AppReq3HypServEntity)
      .createQueryBuilder()
      .insert()
      .into(AppReq3HypServEntity)
      .values([
        {
          UTENTE_FROM: entity.COD_OP,
          PROGR: max?.maxProgr || 1,
          CHIAVE_ESTERNA: entity.id,
          NUM_AZIENDA: entity.AZIENDA_ID,
          DATAORA_RICHIESTA: new Date(),
          COD_REQ3_HYPSERV: APP_REQ3_HYPSERV_TIPO_RICHIESTA.COMPONENTI_ORP_EFF,
          CAMPO_PARAMETRI: componente,
        },
      ])
      .execute();

    const update = await manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder()
      .update()
      .set({
        APP_REQ3_HYPSERV_COD_CHIAVE: entity.id,
        KM: Number(km.replaceAll(',', '.')),
      })
      .where('id = :id', { id: entity.id })
      .execute();
  }

  async CercoEpsNestjsArticoliCosti(
    manager: EntityManager,
    CF_COMM_ID: string,
    COD_CF: string,
    TIPO_TRASFERTA: TipoTrasferta,
  ): Promise<string | null> {
    const articoliCostiCfComm = await manager
      .getRepository(ArticoliCostiCfCommEntity)
      .createQueryBuilder('articoliCostiCfCommEntity')
      .select()
      .where('CF_COMM_ID=:CF_COMM_ID AND TIPO_TRASFERTA=:TIPO_TRASFERTA', {
        CF_COMM_ID,
        TIPO_TRASFERTA,
      })
      .getOne();

    if (articoliCostiCfComm?.COD_ART) {
      return articoliCostiCfComm?.COD_ART || null;
    }

    const articoliCostiCf = await manager
      .getRepository(ArticoliCostiCfEntity)
      .createQueryBuilder('articoliCostiCfEntity')
      .select(['articoliCostiCfEntity.COD_ART'])
      .where('COD_CF=:COD_CF AND TIPO_TRASFERTA=:TIPO_TRASFERTA', {
        COD_CF,
        TIPO_TRASFERTA,
      })
      .getOne();

    if (articoliCostiCf?.COD_ART) {
      return articoliCostiCf.COD_ART || null;
    }

    const articoliCostiCfDefault = await manager
      .getRepository(ArticoliCostiCfEntity)
      .createQueryBuilder('articoliCostiCfEntity')
      .select(['articoliCostiCfEntity.COD_ART'])
      .where('COD_CF=:COD_CF AND TIPO_TRASFERTA=:TIPO_TRASFERTA', {
        COD_CF: DEFAULT.COD_CF,
        TIPO_TRASFERTA,
      })
      .getOne();

    return articoliCostiCfDefault?.COD_ART || null;
  }

  private makeEsecuzioneOrpEffCicli(
    DOC_RIGA_ID: string,
    COD_OP: string,
    DATA_INIZIO: Date,
    DATA_FINE: Date,
    TEMPO_OPERATORE: string,
    tipoTrasferta: TipoTrasferta,
  ): string {
    // '', //Parametro 1 - DOC_RIGA_ID del Ciclo oppure Codice Breve del CICLO
    // '', //Parametro 2 - Codice Operatore
    // '0', //Parametro 3 - Flag che indica se bisogna cercare il record di esec_matt (0_No 1_Si, e deve esistere 2_Si, e può non esistere, in tal caso usa i dati di questa richiesta)|
    // '', //Parametro 4 - Data-Ora inizio (usato nel caso manchi il record di esec_matt o quando non si vuole cercare il record stesso) (stringa da 12 caratteri contenenti anno(4), mese(2), giorno(2), ore(2), minuti(2)
    // '', //Parametro 5 - Data-Ora fine (stringa da 12 caratteri contenenti anno(4), mese(2), giorno(2), ore(2), minuti(2)|
    // '0', //Parametro 6 - Quantità prodotta
    // '0', //Parametro 7 - Scarti |
    // '0', //Parametro 8 - Flag chiusura forzata ciclo (0_No 1_Si)|
    // '', //Parametro 9 - Codice centro effettivo
    // '', //Parametro 10 - Codice macchina effettiva
    // '1', //Parametro 11 - Numero addetti
    // '1', //Parametro 12 - Codice causale di produzione
    // '0', //Parametro 13 - Flag chiusura provvisoria (O_No 1_Si)
    // '0', //Parametro 14 - Flag per scarico eccedenze (solo se il flag "sempre proporzionale" di testata è SPENTO) (O_No 1_Si) |
    // '0', //Parametro 15 - Flag per indicazione esecuzione "non conforme" (0_No 1_Si)
    // '0', //Parametro 16 - Flag per chiudere il ciclo se la quantità prodotta raggiunta è sufficiente (quando "Chiusura forzata spento" ed opzione "Chiusura manuale dei cicli di lavoro" acceso (0_No 1_Si)
    // '', //Parametro 17 - Note
    // '1', //Parametro 18 - Flag che indica se utilizzare i parametri 18 e 19 per i tempi operatore-macchina (0_No 1_Si) * Modifica del 28.08.2023 con richiesta volante di Carraro
    // '', //Parametro 19 - (se Parametro 18 = 1) Tempo operatore in minuti: Modifica del 28.08.2023 con richiesta volante di Carraro
    // '', //Parametro 20 - (se Parametro 18 = 1) Tempo macchina in minuti # Modifica del 28.08.2023 con richiesta volante di Carraro
    // '', //Parametro 21 - Tempo improduttivo in minuti

    const copyHypservText = [...hypservEsecuzioniDefaultParams];

    copyHypservText[0] = DOC_RIGA_ID + separator;
    copyHypservText[1] = COD_OP + separator;

    copyHypservText[3] = transformer.convertiPerServizioHG(DATA_INIZIO) + '0000' + separator;
    copyHypservText[4] = transformer.convertiPerServizioHG(DATA_FINE) + '0000' + separator;

    copyHypservText[16] = tipoTrasferta + separator;
    copyHypservText[18] = transformer.convertInMinuti(TEMPO_OPERATORE) + separator;

    return copyHypservText.join('');
  }

  private makeComponentiOrpEff(DOC_RIGA_ID: string, COD_ART: string, QUANT: string): string {
    const copyAppReqComponentiText = [...appReqComponentiDefaultParams];

    copyAppReqComponentiText[1] = DOC_RIGA_ID;

    copyAppReqComponentiText[8] = COD_ART;
    copyAppReqComponentiText[11] = QUANT;

    return copyAppReqComponentiText.join('');
  }

  async fetchGoogleDistanza(
    xVolte: number,
    entityManager: EntityManager,
    cfSedeDiPartenza: CfEntity | null,
    REGIONE: string | null,
    STATO_CF: string | null,
    PROVINCIA_CF: string | null,
    COMUNE_CF: string | null,
    CAP_CF: string | null,
    INDI_CF: string | null,
  ): Promise<string> {
    const apiKey = process.env.GOOGLE_API_MAP; // Sostituisci con la tua API Key di Google
    const baseUrl = process.env.GOOGLE_DATA_MATRIX || '';

    if (cfSedeDiPartenza == null) throw Error('Sede principale non definita');

    const origins = [
      //cfSedePrincipale.REGIONE,
      cfSedeDiPartenza.STATO_CF,
      cfSedeDiPartenza.PROVINCIA_CF,
      cfSedeDiPartenza.COMUNE_CF,
      cfSedeDiPartenza.CAP_CF,
      cfSedeDiPartenza.INDI_CF,
    ];

    const destinations = [
      //REGIONE,
      STATO_CF,
      PROVINCIA_CF,
      COMUNE_CF,
      CAP_CF,
      INDI_CF,
    ];

    const _origin = origins.join(',');
    const _destination = destinations.join(',');

    const result = await entityManager.getRepository(EpsNestjsDestinazioniEntity).find({ where: { LINK: _destination } });

    if (result.length == 0) {
      try {
        const response = await axios.get<ApiResponse>(baseUrl, {
          params: {
            origins: _origin, // Origini separate da "|"
            destinations: _destination, // Destinazioni separate da "|"
            key: apiKey,
          },
        });

        if (response.status === 200) {
          if (response.data.rows.length > 0 && response.data.rows[0].elements.length > 0) {
            const metri = response.data.rows[0].elements[0].distance.value;
            const kmStr = response.data.rows[0].elements[0].distance.text;
            const responseStr = JSON.stringify(response.data);

            console.info(responseStr);

            await entityManager
              .getRepository(EpsNestjsDestinazioniEntity)
              .createQueryBuilder()
              .insert()
              .into(EpsNestjsDestinazioniEntity)
              .values([
                {
                  RESPONSE: responseStr,
                  VALUE: metri,
                  KM: kmStr,
                  LINK: _destination,
                },
              ])
              .execute();

            return new Decimal(metri).mul(xVolte).dividedBy(1000).toDecimalPlaces(1).toString().replace('.', ','); // Round to 1 decimal place
          }
        } else {
          throw new Error(`Errore nella richiesta: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Errore durante la richiesta a Google Distance Matrix:', error);
        throw error;
      }
    } else {
      return new Decimal(result[0].VALUE).mul(xVolte).dividedBy(1000).toDecimalPlaces(1).toString().replace('.', ',');
    }

    return '0';
  }

  // -----------------------------------------------------------------------

  async SalvoConErroreEsecuzione(tipo: TIPO_ERRORI_SYNC, manager: EntityManager, id: string) {
    const result = await manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder()
      .update()
      .set({ HYPSERV_REQ2_COD_CHIAVE: '-1', ERROR_SYNC: tipo })
      .where('id = :id', { id })
      .execute();
  }

  async SalvoConErroreComponente(tipo: TIPO_ERRORI_SYNC, manager: EntityManager, id: string) {
    const result = await manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder()
      .update()
      .set({ APP_REQ3_HYPSERV_COD_CHIAVE: '-1', ERROR_SYNC: tipo })
      .where('id = :id', { id })
      .execute();
  }
}
