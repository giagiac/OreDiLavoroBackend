import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import Decimal from 'decimal.js';
import { EntityManager, In, Repository } from 'typeorm';
import { AppReq3HypServEntity } from '../../../../../app-req3-hyp-servs/infrastructure/persistence/relational/entities/app-req3-hyp-serv.entity';
import { ArtAnaEntity } from '../../../../../art-ana/infrastructure/persistence/relational/entities/art-ana.entity';
import { ArticoliCostiCfCommEntity } from '../../../../../articoli-costi-cf-comm/infrastructure/persistence/relational/entities/articoli-costi-cf-comm.entity';
import { ArticoliCostiCfEntity } from '../../../../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';
import { CfEntity, DEFAULT } from '../../../../../cfs/infrastructure/persistence/relational/entities/cf.entity';
import { EpsNestjsDestinazioniEntity } from '../../../../../eps-nestjs-destinazionis/infrastructure/persistence/relational/entities/eps-nestjs-destinazioni.entity';
import { EpsNestjsOrpEffCicliEsecChildEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esec-children/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec-child.entity';
import { TipoTrasferta } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/domain/eps-nestjs-orp-eff-cicli-esec';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { HypServReq2Entity } from '../../../../../hyp-serv-req2/infrastructure/persistence/relational/entities/hyp-serv-req2.entity';
import { OrdCliRigheEntity } from '../../../../../ord-cli-righes/infrastructure/persistence/relational/entities/ord-cli-righe.entity';
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
  'tv_row_riga.DES_DIST=', '', separator // 14
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
      await this.processFuoriSedeRitornoInGiornata(manager, id);
      await this.processFuoriSedeRitornoDopo21(manager, id);

      await this.processAncoraInTrasfertaLike(manager, id);

      await this.processAncoraInTrasferta0(manager, id);
      await this.processAncoraInTrasferta10(manager, id);
      await this.processAncoraInTrasferta20(manager, id);
      await this.processAncoraInTrasferta30(manager, id);
      await this.processAncoraInTrasferta40(manager, id);
      await this.processStep1KmAutista(manager, id);

      return {
        data: {
          list: [],
        },
      };
    });
  }

  // -------------------------------------------------------------------------------------------------------------------

  private async getBaseEsecuzioniQueryBuilder(
    manager: EntityManager,
    tipoTrasferta: TipoTrasferta,
    id: string | null,
  ): Promise<EpsNestjsOrpEffCicliEsecEntity[]> {
    const entitiesSql = manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder('epsNestjsOrpEffCicliEsec')
      .select()
      .andWhere('"epsNestjsOrpEffCicliEsec"."HYPSERV_REQ2_COD_CHIAVE" IS NULL')
      .andWhere('"epsNestjsOrpEffCicliEsec"."TIPO_TRASFERTA" = :tipoTrasferta', { tipoTrasferta });

    if (id) {
      entitiesSql.andWhere('"epsNestjsOrpEffCicliEsec"."id" = :id', { id });
    }

    entitiesSql.orderBy('"epsNestjsOrpEffCicliEsec"."id"', 'ASC');

    return await entitiesSql.getMany();
  }

  private async getBaseEsecuzioniQueryBuilderGroupLikeEsecuzioni(
    manager: EntityManager,
    DOC_RIGA_ID: String,
    COD_ART: String,
    DATA_INIZIO: String,
    TIPO_TRASFERATA: String,
  ): Promise<EpsNestjsOrpEffCicliEsecEntity[]> {
    
    let tipoTrasferta = TIPO_TRASFERATA;

    if (TIPO_TRASFERATA.indexOf('ancora_in_trasferta_') > -1) {
      tipoTrasferta = 'ancora_in_trasferta_';
    }

    const entitiesSql = manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder('epsNestjsOrpEffCicliEsec')
      .select()
      .andWhere('"epsNestjsOrpEffCicliEsec"."HYPSERV_REQ2_COD_CHIAVE" IS NULL')
      .andWhere(`"epsNestjsOrpEffCicliEsec"."TIPO_TRASFERTA" LIKE :TIPO_TRASFERATA`, { TIPO_TRASFERATA: `${tipoTrasferta}%` })
      .andWhere('"epsNestjsOrpEffCicliEsec"."DOC_RIGA_ID" = :DOC_RIGA_ID', { DOC_RIGA_ID })
      .andWhere('"epsNestjsOrpEffCicliEsec"."COD_ART" = :COD_ART', { COD_ART })
      .andWhere(`TO_CHAR("epsNestjsOrpEffCicliEsec"."DATA_INIZIO", 'YYYY-MM-DD') = :DATA_INIZIO_YYYYMMDD`, {
        DATA_INIZIO_YYYYMMDD: DATA_INIZIO,
      });

    entitiesSql.orderBy('"epsNestjsOrpEffCicliEsec"."id"', 'ASC');

    return await entitiesSql.getMany();
  }

  private async getBaseComponentiQueryBuilder(
    manager: EntityManager,
    tipoTrasferta: TipoTrasferta,
    id: string | null,
  ): Promise<EpsNestjsOrpEffCicliEsecEntity[]> {
    const entitiesSql = manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder('epsNestjsOrpEffCicliEsec')

      .innerJoinAndSelect('epsNestjsOrpEffCicliEsec.operatori', 'operatori')
      .innerJoinAndSelect('operatori.user', 'user')
      .innerJoinAndSelect('user.role', 'role')

      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.hypServReq2', 'hypServReq2')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.appReq3HypServ', 'appReq3HypServ')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.orpEffCicli', 'orpEffCicli')

      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.artAna', 'artAna')

      .leftJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
      .leftJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
      .leftJoinAndSelect('ordCliRighe.ordCli', 'ordCli')
      .leftJoinAndSelect('ordCli.cfComm', 'cfComm')
      .leftJoinAndSelect('ordCliRighe.cf', 'cf')

      .leftJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
      .leftJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')

      .select()
      .andWhere('"epsNestjsOrpEffCicliEsec"."APP_REQ3_HYPSERV_COD_CHIAVE" IS NULL')
      .andWhere('"epsNestjsOrpEffCicliEsec"."TIPO_TRASFERTA" = :tipoTrasferta', { tipoTrasferta });

    if (id) {
      entitiesSql.andWhere('"epsNestjsOrpEffCicliEsec"."id" = :id', { id });
    }

    // fondamentale serve ad ORGANIZZARE I GRUPPI DI LAVORO...
    entitiesSql.orderBy({
      '"epsNestjsOrpEffCicliEsec"."DOC_RIGA_ID"': 'ASC',
      '"epsNestjsOrpEffCicliEsec"."COD_ART"': 'ASC',
      '"epsNestjsOrpEffCicliEsec"."DATA_INIZIO"': 'ASC',
    });

    return await entitiesSql.getMany();
  }

  private async getBaseComponentiQueryBuilderRicercaKmMax(
    manager: EntityManager,
    id: string | null,
  ): Promise<EpsNestjsOrpEffCicliEsecEntity[]> {
    const tipoTrasferta = 'ancora_in_trasferta_';

    const entitiesSql = manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder('epsNestjsOrpEffCicliEsec')

      .innerJoinAndSelect('epsNestjsOrpEffCicliEsec.operatori', 'operatori')
      .innerJoinAndSelect('operatori.user', 'user')
      .innerJoinAndSelect('user.role', 'role')

      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.hypServReq2', 'hypServReq2')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.appReq3HypServ', 'appReq3HypServ')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.orpEffCicli', 'orpEffCicli')

      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.artAna', 'artAna')

      .leftJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
      .leftJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
      .leftJoinAndSelect('ordCliRighe.ordCli', 'ordCli')
      .leftJoinAndSelect('ordCli.cfComm', 'cfComm')
      .leftJoinAndSelect('ordCliRighe.cf', 'cf')

      .leftJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
      .leftJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')

      .select()
      .andWhere('"epsNestjsOrpEffCicliEsec"."APP_REQ3_HYPSERV_COD_CHIAVE" IS NULL')
      .andWhere(`"epsNestjsOrpEffCicliEsec"."TIPO_TRASFERTA" LIKE :TIPO_TRASFERATA`, { TIPO_TRASFERATA: `${tipoTrasferta}%` });

    if (id) {
      entitiesSql.andWhere('"epsNestjsOrpEffCicliEsec"."id" = :id', { id });
    }

    // fondamentale serve ad ORGANIZZARE I GRUPPI DI LAVORO...
    entitiesSql.orderBy({
      '"epsNestjsOrpEffCicliEsec"."DOC_RIGA_ID"': 'ASC',
      '"epsNestjsOrpEffCicliEsec"."COD_ART"': 'ASC',
      '"epsNestjsOrpEffCicliEsec"."DATA_INIZIO"': 'ASC',
    });

    return await entitiesSql.getMany();
  }

  private async getBaseComponentiQueryBuilderGroupEsecuzioni(
    manager: EntityManager,
    tipoTrasferta: TipoTrasferta,
    DOC_RIGA_ID: String,
    COD_ART: String,
    DATA_INIZIO: String,
  ): Promise<EpsNestjsOrpEffCicliEsecEntity[]> {
    const entitiesSql = manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder('epsNestjsOrpEffCicliEsec')

      .innerJoinAndSelect('epsNestjsOrpEffCicliEsec.operatori', 'operatori')
      .innerJoinAndSelect('operatori.user', 'user')
      .innerJoinAndSelect('user.role', 'role')

      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.hypServReq2', 'hypServReq2')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.appReq3HypServ', 'appReq3HypServ')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.orpEffCicli', 'orpEffCicli')

      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.artAna', 'artAna')

      .leftJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
      .leftJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
      .leftJoinAndSelect('ordCliRighe.ordCli', 'ordCli')
      .leftJoinAndSelect('ordCli.cfComm', 'cfComm')
      .leftJoinAndSelect('ordCliRighe.cf', 'cf')

      .leftJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
      .leftJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')

      .select()

      .andWhere('"epsNestjsOrpEffCicliEsec"."APP_REQ3_HYPSERV_COD_CHIAVE" IS NULL')
      .andWhere('"epsNestjsOrpEffCicliEsec"."TIPO_TRASFERTA" = :tipoTrasferta', { tipoTrasferta })
      .andWhere('"epsNestjsOrpEffCicliEsec"."DOC_RIGA_ID" = :DOC_RIGA_ID', { DOC_RIGA_ID })
      .andWhere('"epsNestjsOrpEffCicliEsec"."COD_ART" = :COD_ART', { COD_ART })
      .andWhere(`TO_CHAR("epsNestjsOrpEffCicliEsec"."DATA_INIZIO", 'YYYY-MM-DD') = :DATA_INIZIO_YYYYMMDD`, {
        DATA_INIZIO_YYYYMMDD: DATA_INIZIO,
      });

    // fondamentale serve ad ORGANIZZARE I GRUPPI DI LAVORO...
    entitiesSql.orderBy({
      '"epsNestjsOrpEffCicliEsec"."DOC_RIGA_ID"': 'ASC',
      '"epsNestjsOrpEffCicliEsec"."COD_ART"': 'ASC',
      '"epsNestjsOrpEffCicliEsec"."DATA_INIZIO"': 'ASC',
    });

    return await entitiesSql.getMany();
  }

  private async getBaseComponentiQueryBuilderGroupEsecuzioniRicercaKmManuali(
    manager: EntityManager,
    DOC_RIGA_ID: String,
    COD_ART: String,
    DATA_INIZIO: String,
  ): Promise<EpsNestjsOrpEffCicliEsecEntity[]> {
    const tipoTrasferta = 'ancora_in_trasferta_';

    const entitiesSql = manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder('epsNestjsOrpEffCicliEsec')

      .innerJoinAndSelect('epsNestjsOrpEffCicliEsec.operatori', 'operatori')
      .innerJoinAndSelect('operatori.user', 'user')
      .innerJoinAndSelect('user.role', 'role')

      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.hypServReq2', 'hypServReq2')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.appReq3HypServ', 'appReq3HypServ')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.orpEffCicli', 'orpEffCicli')

      .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.artAna', 'artAna')

      .leftJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
      .leftJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
      .leftJoinAndSelect('ordCliRighe.ordCli', 'ordCli')
      .leftJoinAndSelect('ordCli.cfComm', 'cfComm')
      .leftJoinAndSelect('ordCliRighe.cf', 'cf')

      .leftJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
      .leftJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')

      .select()

      .andWhere('"epsNestjsOrpEffCicliEsec"."APP_REQ3_HYPSERV_COD_CHIAVE" IS NULL')
      .andWhere(`"epsNestjsOrpEffCicliEsec"."TIPO_TRASFERTA" LIKE :TIPO_TRASFERATA`, { TIPO_TRASFERATA: `${tipoTrasferta}%` })
      .andWhere('"epsNestjsOrpEffCicliEsec"."DOC_RIGA_ID" = :DOC_RIGA_ID', { DOC_RIGA_ID })
      .andWhere('"epsNestjsOrpEffCicliEsec"."COD_ART" = :COD_ART', { COD_ART })
      .andWhere(`TO_CHAR("epsNestjsOrpEffCicliEsec"."DATA_INIZIO", 'YYYY-MM-DD') = :DATA_INIZIO_YYYYMMDD`, {
        DATA_INIZIO_YYYYMMDD: DATA_INIZIO,
      });

    // fondamentale serve ad ORGANIZZARE I GRUPPI DI LAVORO...
    entitiesSql.orderBy({
      '"epsNestjsOrpEffCicliEsec"."DOC_RIGA_ID"': 'ASC',
      '"epsNestjsOrpEffCicliEsec"."COD_ART"': 'ASC',
      '"epsNestjsOrpEffCicliEsec"."DATA_INIZIO"': 'ASC',
    });

    return await entitiesSql.getMany();
  }

  private getBaseComponentiChildQueryBuilder(manager: EntityManager, idfk: string | null) {
    const entitiesSql = manager
      .getRepository(EpsNestjsOrpEffCicliEsecChildEntity)
      .createQueryBuilder('epsNestjsOrpEffCicliEsecChild')

      .innerJoinAndSelect('epsNestjsOrpEffCicliEsecChild.operatori', 'operatori')
      .innerJoinAndSelect('operatori.user', 'user')
      .innerJoinAndSelect('user.role', 'role')

      .leftJoinAndSelect('epsNestjsOrpEffCicliEsecChild.hypServReq2', 'hypServReq2')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsecChild.appReq3HypServ', 'appReq3HypServ')
      .leftJoinAndSelect('epsNestjsOrpEffCicliEsecChild.orpEffCicli', 'orpEffCicli')

      .leftJoinAndSelect('epsNestjsOrpEffCicliEsecChild.artAna', 'artAna')

      .leftJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
      .leftJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
      .leftJoinAndSelect('ordCliRighe.ordCli', 'ordCli')
      .leftJoinAndSelect('ordCli.cfComm', 'cfComm')
      .leftJoinAndSelect('ordCliRighe.cf', 'cf')

      .leftJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
      .leftJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')

      .select()

      .andWhere('"epsNestjsOrpEffCicliEsecChild"."APP_REQ3_HYPSERV_COD_CHIAVE" IS NULL')
      .andWhere('"epsNestjsOrpEffCicliEsecChild"."idfk" = :idfk', { idfk })

      .orderBy('"epsNestjsOrpEffCicliEsecChild"."DOC_RIGA_ID"', 'ASC')
      .orderBy('"epsNestjsOrpEffCicliEsecChild"."COD_ART"', 'ASC')
      .orderBy('"epsNestjsOrpEffCicliEsecChild"."DATA_INIZIO"', 'ASC');

    return entitiesSql;
  }

  // -------------------------------------------------------------------------------------------------------------------

  async processGenericEsecuzioni(tipoTrasferta: TipoTrasferta, manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    let esecuzioni = await this.getBaseEsecuzioniQueryBuilder(manager, tipoTrasferta, id);

    if (id) {
      if (esecuzioni.length > 0) {
        const DOC_RIGA_ID = esecuzioni[0].DOC_RIGA_ID;
        const COD_ART = esecuzioni[0].COD_ART;
        const DATA_INIZIO = esecuzioni[0].DATA_INIZIO?.toISOString().substring(0, 10) || '';
        const TIPO_TRASFERTA = esecuzioni[0].TIPO_TRASFERTA;
        const COD_OP = esecuzioni[0].COD_OP;
        const DATA_FINE = esecuzioni[0].DATA_FINE;
        if (
          DOC_RIGA_ID == null ||
          COD_ART == null ||
          DATA_INIZIO == null ||
          TIPO_TRASFERTA == null ||
          // servono più avanti (non li uso per il check di gruppo ovviamente)
          COD_OP == null ||
          DATA_FINE == null
        ) {
          await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DATI_SET_MINIMO, manager, esecuzioni[0].id);
          return;
        }

        // la ricerca sarà like perchè gli operatori poterbbero selezionare KM dicersi (p.e. 20 30 40) ma alla fine sarà solo un costo che riporta
        // il valore maggiore - in questo caso le esecuzioni devono essere processate tutte (non solo quella stretta sul TIPO_TRASFERTA del id richiesto)
        esecuzioni = await this.getBaseEsecuzioniQueryBuilderGroupLikeEsecuzioni(
          manager,
          DOC_RIGA_ID,
          COD_ART,
          DATA_INIZIO,
          TIPO_TRASFERTA,
        );
      }
    }

    for (const entity of esecuzioni) {
      // genero solo l'esecuzione
      await this.GeneroEsecuzioneOperatore(manager, entity);
    }
  }

  async processGenericComponentiCostoTrasferta(
    kmManuali: number | null,
    xVolte: number,
    tipoTrasferta: TipoTrasferta,
    manager: EntityManager,
    id: string | null,
  ): Promise<void> {
    let componenti = await this.getBaseComponentiQueryBuilder(manager, tipoTrasferta, id);
    // questo id indica che la richiesta è PUNTAULE per una singola EPS_NESTJS_ORP_EFF_CICLI_ESEC (ovvero quando cliccco su SEND TO HG)
    // raccolgo quindi tutti gli EPS_NESTJS_ORP_EFF_CICLI_ESEC collegati eventualmente anche per altri OPERATORI (avessero lavorato assieme)
    if (id) {
      if (componenti.length > 0) {
        // devo cmq verificare che la query precendete abbia almeno un record
        const DOC_RIGA_ID = componenti[0].DOC_RIGA_ID;
        const COD_ART = componenti[0].COD_ART;
        const DATA_INIZIO = componenti[0].DATA_INIZIO?.toISOString().substring(0, 10) || '';
        const TIPO_TRASFERTA = componenti[0].TIPO_TRASFERTA;
        const COD_OP = componenti[0].COD_OP;
        const DATA_FINE = componenti[0].DATA_FINE;
        if (
          DOC_RIGA_ID == null ||
          COD_ART == null ||
          DATA_INIZIO == null ||
          TIPO_TRASFERTA == null ||
          // servono più avanti (non li uso per il check di gruppo ovviamente)
          COD_OP == null ||
          // ricorda che DATA_FINE coincide con DATA_INIZIO
          DATA_FINE == null
        ) {
          await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DATI_SET_MINIMO, manager, componenti[0].id);
          return;
        }

        componenti = await this.getBaseComponentiQueryBuilderGroupEsecuzioni(manager, TIPO_TRASFERTA, DOC_RIGA_ID, COD_ART, DATA_INIZIO);
      }
    }

    let prevGroup = ''; // al primo passaggio genero il componente sempre
    let prevId = '';
    let prevMaxId = '';

    for (const entity of componenti || []) {
      if (
        entity.DOC_RIGA_ID == null ||
        entity.COD_ART == null ||
        entity.DATA_INIZIO == null ||
        entity.TIPO_TRASFERTA == null ||
        // servono più avanti (non li uso per il check di gruppo ovviamente)
        entity.COD_OP == null ||
        entity.DATA_FINE == null
      ) {
        await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DATI_SET_MINIMO, manager, entity.id);
        return;
      }

      const DATA_INIZIO = entity.DATA_INIZIO?.toISOString().substring(0, 10) || '';

      const currGroup = entity.DOC_RIGA_ID + entity.COD_ART + entity.TIPO_TRASFERTA + DATA_INIZIO; // della data prendo solo anno mese giorno -- TIPO_TRASFERTA non servirebbe lo lascio solo per comprensione
      if (currGroup !== prevGroup) {
        prevGroup = currGroup;
        prevId = entity.id;
        // Genero componente COSTO trasferta
        await this.GeneroComponenteCicloCostoOperatoreTrasferta(manager, entity);

        if (!entity.orpEffCicli || !entity.orpEffCicli.linkOrpOrd || entity.orpEffCicli.linkOrpOrd.length === 0) {
          await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.LINK_ORP_EFF, manager, entity.id);
          return;
        }

        if (entity.orpEffCicli.linkOrpOrd[0].ordCliRighe == null) {
          await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.ORP_EFF_CICLI, manager, entity.id);
          return;
        }

        let km: Decimal = new Decimal(0);

        if (
          entity.orpEffCicli &&
          entity.orpEffCicli.linkOrpOrd &&
          entity.orpEffCicli.linkOrpOrd.length > 0 &&
          entity.orpEffCicli.linkOrpOrd[0].ordCliRighe
        ) {
          const ordCliRighe = entity.orpEffCicli.linkOrpOrd[0].ordCliRighe;

          const entitiesSqlCfOriginDefault = manager
            .getRepository(CfEntity)
            .createQueryBuilder()
            .where('COD_CF=:COD_CF', { COD_CF: entity.operatori?.user?.CF_ORIGIN_DEFAULT });

          const cfOriginDefault: CfEntity | null = await entitiesSqlCfOriginDefault.getOne();

          if (kmManuali !== null && kmManuali !== undefined) {
            km = Decimal(kmManuali);
          } else {
            km = await this.CalcoloDistanzaKmOrdineCliente(xVolte, manager, ordCliRighe, entity.id, '', cfOriginDefault);
          }
        } else {
          await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.LINK_ORP_EFF, manager, entity.id);
          return;
        }

        prevMaxId = (await this.GeneroComponenteKm(km, manager, entity)) || '';
      } else {
        // Indico i successivi operatori del gruppo di viaggio come processati - con lo stesso COD_CHIAVE dell'autista
        await manager
          .getRepository(EpsNestjsOrpEffCicliEsecEntity)
          .createQueryBuilder()
          .update()
          .set({
            APP_REQ3_HYPSERV_COD_CHIAVE: prevMaxId,
          })
          .where('id = :id', { id: prevId })
          .execute();
      }
    }
  }

  async processGenericComponentiCostoTrasfertaRicercaKmMax(manager: EntityManager, id: string | null): Promise<void> {
    let componenti = await this.getBaseComponentiQueryBuilderRicercaKmMax(manager, id);
    // questo id indica che la richiesta è PUNTAULE per una singola EPS_NESTJS_ORP_EFF_CICLI_ESEC (ovvero quando cliccco su SEND TO HG)
    // raccolgo quindi tutti gli EPS_NESTJS_ORP_EFF_CICLI_ESEC collegati eventualmente anche per altri OPERATORI (avessero lavorato assieme)
    if (id) {
      if (componenti.length > 0) {
        // devo cmq verificare che la query precendete abbia almeno un record
        const DOC_RIGA_ID = componenti[0].DOC_RIGA_ID;
        const COD_ART = componenti[0].COD_ART;
        const DATA_INIZIO = componenti[0].DATA_INIZIO?.toISOString().substring(0, 10) || '';
        const COD_OP = componenti[0].COD_OP;
        const DATA_FINE = componenti[0].DATA_FINE;
        if (
          DOC_RIGA_ID == null ||
          COD_ART == null ||
          DATA_INIZIO == null ||
          // servono più avanti (non li uso per il check di gruppo ovviamente)
          COD_OP == null ||
          // ricorda che DATA_FINE coincide con DATA_INIZIO
          DATA_FINE == null
        ) {
          await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DATI_SET_MINIMO, manager, componenti[0].id);
          return;
        }

        componenti = await this.getBaseComponentiQueryBuilderGroupEsecuzioniRicercaKmManuali(manager, DOC_RIGA_ID, COD_ART, DATA_INIZIO);
      }
    }

    let prevGroup = ''; // al primo passaggio genero il componente sempre
    let prevId = '';
    let prevMaxId = '';

    let km: Decimal = new Decimal(0);

    // cerco tra quelli del gruppo ma che sia il valore maggiore
    if (componenti && componenti.length > 0) {
      km = new Decimal(Math.max(...componenti.map((c) => new Decimal(c.KM || 0).toNumber())));
    }

    for (const entity of componenti || []) {
      if (
        entity.DOC_RIGA_ID == null ||
        entity.COD_ART == null ||
        entity.DATA_INIZIO == null ||
        // servono più avanti (non li uso per il check di gruppo ovviamente)
        entity.COD_OP == null ||
        entity.DATA_FINE == null
      ) {
        await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DATI_SET_MINIMO, manager, entity.id);
        return;
      }

      const DATA_INIZIO = entity.DATA_INIZIO?.toISOString().substring(0, 10) || '';

      const currGroup = entity.DOC_RIGA_ID + entity.COD_ART + DATA_INIZIO; // della data prendo solo anno mese giorno -- TIPO_TRASFERTA non servirebbe lo lascio solo per comprensione
      if (currGroup !== prevGroup) {
        prevGroup = currGroup;
        prevId = entity.id;

        prevMaxId = (await this.GeneroComponenteKm(km, manager, entity)) || '';
      } else {
        // Indico i successivi operatori del gruppo di viaggio come processati - con lo stesso COD_CHIAVE dell'autista
        await manager
          .getRepository(EpsNestjsOrpEffCicliEsecEntity)
          .createQueryBuilder()
          .update()
          .set({
            APP_REQ3_HYPSERV_COD_CHIAVE: prevMaxId,
          })
          .where('id = :id', { id: prevId })
          .execute();
      }
    }
  }

  async processKmAutistaTrasferta(manager: EntityManager, id: string | null): Promise<Array<EpsNestjsOrpEffCicliEsecEntity> | void> {
    const componenti = await this.getBaseComponentiQueryBuilder(manager, 'step1_km_autista', id);

    for (const entity of componenti || []) {
      if (
        !entity.orpEffCicli ||
        !entity.orpEffCicli.linkOrpOrd ||
        entity.orpEffCicli.linkOrpOrd.length === 0 ||
        !entity.orpEffCicli.linkOrpOrd[0].ordCliRighe
      ) {
        await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.ORD_CLI_RIGHE, manager, entity.id);
        return;
      }

      const KM_AUTISTA = new Decimal(entity.KM || 0);

      // origine di default sia per le destinazioni intermedie che quella di origine principale
      const entitiesSqlCfOriginDefault = manager
        .getRepository(CfEntity)
        .createQueryBuilder()
        .where('COD_CF=:COD_CF', { COD_CF: entity.operatori?.user?.CF_ORIGIN_DEFAULT });
      const cfOriginDefault: CfEntity | null = await entitiesSqlCfOriginDefault.getOne();

      // PRIMO STEP KM da SEDE a DESTINAZIONE CLIENTE
      const CLIENTE_1_km = await this.CalcoloDistanzaKmOrdineCliente(
        1,
        manager,
        entity.orpEffCicli.linkOrpOrd[0].ordCliRighe,
        entity.id,
        '',
        cfOriginDefault,
      );

      const componentiChild = await this.getBaseComponentiChildQueryBuilder(manager, entity.id).getMany();

      let sumKmCalcolati: Decimal = CLIENTE_1_km;

      // STEP SUCCESSIVI - KM da DESTINAZIONE CLIENTE a DESTINAZIONE CLIENTE
      for (const child of componentiChild || []) {
        if (
          child.DOC_RIGA_ID == null ||
          child.COD_OP == null ||
          child.DATA_INIZIO == null ||
          child.DATA_FINE == null ||
          child.TIPO_TRASFERTA == null
        ) {
          await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DATI_SET_MINIMO_CHILD, manager, entity.id);
          return;
        }

        if (
          child.orpEffCicli &&
          child.orpEffCicli.linkOrpOrd &&
          child.orpEffCicli.linkOrpOrd.length > 0 &&
          child.orpEffCicli.linkOrpOrd[0].ordCliRighe
        ) {
          const CLIENTE_next_km = await this.CalcoloDistanzaKmOrdineCliente(
            1,
            manager,
            child.orpEffCicli.linkOrpOrd[0].ordCliRighe,
            entity.id,
            child.id,
            cfOriginDefault,
          );

          child.KM = CLIENTE_next_km;
          sumKmCalcolati = sumKmCalcolati.add(CLIENTE_next_km);
        } else {
          await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.LINK_ORP_EFF, manager, entity.id);
          return;
        }
      }

      const coeff = sumKmCalcolati.isZero() ? new Decimal(1) : KM_AUTISTA.div(sumKmCalcolati)

      console.log(`Coefficente per ripartizione distanze: ${entity.id} -> ${coeff.toString()}`);

      // prima destinazione
      entity.KM = coeff.mul(CLIENTE_1_km);
      // successive intermedie
      for (const child of componentiChild || []) {
        child.KM = coeff.mul(child.KM || new Decimal(0));
      }

      entity.epsNestjsOrpEffCicliEsecChild = componentiChild;
    }

    return componenti;
  }

  // -------------------------------------------------------------------------------------------------------------------

  async processInSede(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    const esecuzioni = await this.getBaseEsecuzioniQueryBuilder(manager, 'in_sede', id);

    for (const entity of esecuzioni) {
      // genero solo l'esecuzione
      await this.GeneroEsecuzioneOperatore(manager, entity);
    }
  }

  async processInGiornata(manager: EntityManager, id: string | null): Promise<void> {
    await this.processGenericEsecuzioni('in_giornata', manager, id);
    await this.processGenericComponentiCostoTrasferta(null, 2, 'in_giornata', manager, id);
  }

  async processInGiornataDopo21(manager: EntityManager, id: string | null): Promise<void> {
    await this.processGenericEsecuzioni('in_giornata_dopo_21', manager, id);
    await this.processGenericComponentiCostoTrasferta(null, 2, 'in_giornata_dopo_21', manager, id);
  }

  async processFuoriSedeAndata(manager: EntityManager, id: string | null): Promise<void> {
    await this.processGenericEsecuzioni('fuori_sede_andata', manager, id);
    await this.processGenericComponentiCostoTrasferta(null, 1, 'fuori_sede_andata', manager, id);
  }

  async processFuoriSedeRitornoInGiornata(manager: EntityManager, id: string | null): Promise<void> {
    await this.processGenericEsecuzioni('fuori_sede_ritorno_in_giornata', manager, id);
    await this.processGenericComponentiCostoTrasferta(null, 1, 'fuori_sede_ritorno_in_giornata', manager, id);
  }

  async processFuoriSedeRitornoDopo21(manager: EntityManager, id: string | null): Promise<void> {
    await this.processGenericEsecuzioni('fuori_sede_ritorno_dopo_21', manager, id);
    await this.processGenericComponentiCostoTrasferta(null, 1, 'fuori_sede_ritorno_dopo_21', manager, id);
  }

  async processAncoraInTrasfertaLike(manager: EntityManager, id: string | null): Promise<void> {
    // Logica Elena, prendo tutti quelli "trasferta_fuori_sede_*" prenderò i chilometri maggiori tra tutti
    await this.processGenericComponentiCostoTrasfertaRicercaKmMax(manager, id);
  }

  async processAncoraInTrasferta0(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    // solo esecuzioni
    await this.processGenericEsecuzioni('ancora_in_trasferta_0', manager, id);
  }

  async processAncoraInTrasferta10(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    // solo esecuzioni
    await this.processGenericEsecuzioni('ancora_in_trasferta_10', manager, id);
  }

  async processAncoraInTrasferta20(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    // solo esecuzioni
    await this.processGenericEsecuzioni('ancora_in_trasferta_20', manager, id);
  }

  async processAncoraInTrasferta30(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    // solo esecuzioni
    await this.processGenericEsecuzioni('ancora_in_trasferta_30', manager, id);
  }

  async processAncoraInTrasferta40(manager: EntityManager, id: string | null): Promise<void> {
    // Usa il manager per eseguire query all'interno della transazione
    // solo esecuzioni
    await this.processGenericEsecuzioni('ancora_in_trasferta_40', manager, id);
  }

  async processStep1KmAutista(manager: EntityManager, id: string | null): Promise<void> {
    const entities = await this.processKmAutistaTrasferta(manager, id);

    for (const entity of entities || []) {
      // genero solo l'esecuzione
      await this.GeneroEsecuzioneOperatore(manager, entity);
      await this.GeneroComponenteKmLiberi(manager, entity);

      for (const child of entity.epsNestjsOrpEffCicliEsecChild || []) {
        await this.GeneroEsecuzioneOperatore(manager, child);
        await this.GeneroComponenteKmLiberi(manager, child);
      }
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // ------------------------------- Genera il tempo in esecuzioni nei cicli -------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  async GeneroEsecuzioneOperatore(manager: EntityManager, entity: EpsNestjsOrpEffCicliEsecEntity | EpsNestjsOrpEffCicliEsecChildEntity) {
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

    let max = await manager.getRepository(HypServReq2Entity).createQueryBuilder().select('MAX(PROGR) + 1', 'maxProgr').getRawOne();

    max = max?.maxProgr || 1;

    const result = await manager
      .getRepository(HypServReq2Entity)
      .createQueryBuilder()
      .insert()
      .into(HypServReq2Entity)
      .values([
        {
          UTENTE_FROM: entity.COD_OP,
          PROGR: max,
          COD_CHIAVE: `${max}_${entity.id}`,
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

    // Se entity è di tipo EpsNestjsOrpEffCicliEsecChildEntity aggiorna la tabella child invece della principale
    if (entity instanceof EpsNestjsOrpEffCicliEsecChildEntity) {
      await manager
        .getRepository(EpsNestjsOrpEffCicliEsecChildEntity)
        .createQueryBuilder()
        .update()
        .set({ HYPSERV_REQ2_COD_CHIAVE: `${max}_${entity.id}` })
        .where('id = :id', { id: entity.id })
        .execute();
    } else {
      await manager
        .getRepository(EpsNestjsOrpEffCicliEsecEntity)
        .createQueryBuilder()
        .update()
        .set({ HYPSERV_REQ2_COD_CHIAVE: `${max}_${entity.id}` })
        .where('id = :id', { id: entity.id })
        .execute();
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // ------------------------ Genera il componente per il costo operatore trasferta ------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  async GeneroComponenteCicloCostoOperatoreTrasferta(manager: EntityManager, entity: EpsNestjsOrpEffCicliEsecEntity) {
    if (!entity.orpEffCicli || !entity.orpEffCicli.linkOrpOrd || entity.orpEffCicli.linkOrpOrd.length === 0) {
      await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.LINK_ORP_EFF, manager, entity.id);
      return;
    }

    const ordCliRighe = entity.orpEffCicli.linkOrpOrd[0].ordCliRighe;

    const cf = ordCliRighe?.cf;
    const ordCli = ordCliRighe?.ordCli;

    let CF_COMM_ID = '';
    if (cf?.COD_CF && ordCli?.NUM_SEDE) {
      CF_COMM_ID = cf.COD_CF + '_' + ordCli.NUM_SEDE;
    }
    const COD_CF = cf?.COD_CF || '';

    // prendo artAna obj perchè mi servirà anche la descrizione
    const artAna = await this.CercoEpsNestjsArticoliCosti(manager, CF_COMM_ID, COD_CF, entity.TIPO_TRASFERTA);
    if (artAna == null) {
      return await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.COD_ART_COSTI_CF_DEFAULT, manager, entity.id);
    }

    const DATA_INIZIO = entity.DATA_INIZIO;
    if (DATA_INIZIO == null) {
      return await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DATA_INIZIO_NON_DEFINITA, manager, entity.id);
    }

    const NOME_OP = entity.operatori?.NOME_OP;
    const DATA_INIZIO_fomattata = transformer.convertiInFormatoDDMMYYYY(DATA_INIZIO);

    const DES_DIST = `${artAna.DES_ART} · ${NOME_OP} · ${DATA_INIZIO_fomattata}`;

    const componente = this.makeComponentiOrpEff(entity.orpEffCicli.DOC_ID, artAna.COD_ART, new Decimal(1), DES_DIST);

    let max = await manager.getRepository(HypServReq2Entity).createQueryBuilder().select('MAX(PROGR) + 1', 'maxProgr').getRawOne();

    max = max?.maxProgr || 1;

    const result = await manager
      .getRepository(AppReq3HypServEntity)
      .createQueryBuilder()
      .insert()
      .into(AppReq3HypServEntity)
      .values([
        {
          UTENTE_FROM: entity.COD_OP,
          PROGR: max,
          CHIAVE_ESTERNA: `${max}_${entity.id}`,
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
        APP_REQ3_HYPSERV_COD_CHIAVE: `${max}_${entity.id}`,
      })
      .where('id = :id', { id: entity.id })
      .execute();
  }

  // -------------------------------------------------------------------------------------------------------------------
  // ----------------------------- Genera il componente per il costo chilometrico --------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  async GeneroComponenteKm(km: Decimal, manager: EntityManager, entity: EpsNestjsOrpEffCicliEsecEntity): Promise<string | void> {
    // caso in cui lo prendo dalla targa | att.ne andrà aggiunto uno e soltanto un COMPONENTE per ogni gruppo di lavoro

    const COD_ART = entity.COD_ART;
    const DOC_ID = entity.orpEffCicli?.DOC_ID;
    const DATA_INIZIO = entity.DATA_INIZIO;

    if (COD_ART == null) {
      return this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.COD_ART_COSTI_CF_DEFAULT, manager, entity.id);
    }
    if (DOC_ID == null) {
      return await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.ORP_EFF_CICLI, manager, entity.id);
    }
    if (DATA_INIZIO == null) {
      return await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DATA_INIZIO_NON_DEFINITA, manager, entity.id);
    }

    const DES_ART = entity.artAna?.DES_ART;
    const DATA_INIZIO_fomattata = transformer.convertiInFormatoDDMMYYYY(DATA_INIZIO);
    const DES_DIST = `${DES_ART} · ${DATA_INIZIO_fomattata}`;

    const componente = this.makeComponentiOrpEff(DOC_ID, COD_ART, km, DES_DIST);

    let max = await manager.getRepository(HypServReq2Entity).createQueryBuilder().select('MAX(PROGR) + 1', 'maxProgr').getRawOne();

    max = max?.maxProgr || 1;

    const result = await manager
      .getRepository(AppReq3HypServEntity)
      .createQueryBuilder()
      .insert()
      .into(AppReq3HypServEntity)
      .values([
        {
          UTENTE_FROM: entity.COD_OP,
          PROGR: max,
          CHIAVE_ESTERNA: `${max}_${entity.id}`,
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
        APP_REQ3_HYPSERV_COD_CHIAVE: `${max}_${entity.id}`,
        KM: km.toDecimalPlaces(1, Decimal.ROUND_UP).toString(),
      })
      .where('id = :id', { id: entity.id })
      .execute();

    return `${max}_${entity.id}`;
  }

  // -------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------- Genera km liberi ---------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  async GeneroComponenteKmLiberi(manager: EntityManager, entity: EpsNestjsOrpEffCicliEsecEntity | EpsNestjsOrpEffCicliEsecChildEntity) {
    if (!entity.orpEffCicli || !entity.orpEffCicli.linkOrpOrd || entity.orpEffCicli.linkOrpOrd.length === 0) {
      await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.LINK_ORP_EFF, manager, entity.id);
      return;
    }

    const km = entity.KM || new Decimal(0);

    const COD_ART = entity.COD_ART; // caso in cui lo prendo dalla targa | att.ne andrà aggiunto uno e soltanto un COMPONENTE per ogni gruppo di lavoro
    const DATA_INIZIO = entity.DATA_INIZIO;

    if (COD_ART == null) {
      return await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.COD_ART_COSTI_CF_DEFAULT, manager, entity.id);
    }
    if (DATA_INIZIO == null) {
      return await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DATA_INIZIO_NON_DEFINITA, manager, entity.id);
    }

    console.info(`Km liberi: ${entity.id} -> ${km}`);

    const DES_ART = entity.artAna?.DES_ART;
    const DATA_INIZIO_fomattata = transformer.convertiInFormatoDDMMYYYY(DATA_INIZIO);

    const DES_DIST = `${DES_ART} · ${DATA_INIZIO_fomattata}`;

    const componente = this.makeComponentiOrpEff(entity.orpEffCicli.DOC_ID, COD_ART, km, DES_DIST);

    let max = await manager.getRepository(HypServReq2Entity).createQueryBuilder().select('MAX(PROGR) + 1', 'maxProgr').getRawOne();

    max = max?.maxProgr || 1;

    await manager
      .getRepository(AppReq3HypServEntity)
      .createQueryBuilder()
      .insert()
      .into(AppReq3HypServEntity)
      .values([
        {
          UTENTE_FROM: entity.COD_OP,
          PROGR: max,
          CHIAVE_ESTERNA: `${max}_${entity.id}`,
          NUM_AZIENDA: entity.AZIENDA_ID,
          DATAORA_RICHIESTA: new Date(),
          COD_REQ3_HYPSERV: APP_REQ3_HYPSERV_TIPO_RICHIESTA.COMPONENTI_ORP_EFF,
          CAMPO_PARAMETRI: componente,
        },
      ])
      .execute();

    // Se entity è di tipo EpsNestjsOrpEffCicliEsecChildEntity aggiorna la tabella child invece della principale
    if (entity instanceof EpsNestjsOrpEffCicliEsecChildEntity) {
      await manager
        .getRepository(EpsNestjsOrpEffCicliEsecChildEntity)
        .createQueryBuilder()
        .update()
        .set({
          APP_REQ3_HYPSERV_COD_CHIAVE: `${max}_${entity.id}`,
          KM: km.toDecimalPlaces(1, Decimal.ROUND_UP).toString(),
        })
        .where('id = :id', { id: entity.id })
        .execute();
      return;
    } else {
      const update = await manager
        .getRepository(EpsNestjsOrpEffCicliEsecEntity)
        .createQueryBuilder()
        .update()
        .set({
          APP_REQ3_HYPSERV_COD_CHIAVE: `${max}_${entity.id}`,
          KM: km.toDecimalPlaces(1, Decimal.ROUND_UP).toString(),
        })
        .where('id = :id', { id: entity.id })
        .execute();
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // ------------------------------- Calcolo distanza usando Ordine cliente --------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  async CalcoloDistanzaKmOrdineCliente(
    xVolte: number,
    manager: EntityManager,
    ordCliRighe: OrdCliRigheEntity,
    id: string,
    idfk: string,
    cfOriginDefault: CfEntity | null,
  ): Promise<Decimal> {
    const cf = ordCliRighe?.cf;
    const cfComm = ordCliRighe?.ordCli?.cfComm;

    if (cf == null && cfComm == null) {
      // mancanza di entrambe - necessari per recuperare un destinazione utilizzabile
      await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.ORD_CLI_CF, manager, id, idfk);
      return new Decimal(0);
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
      await this.SalvoConErroreEsecuzione(TIPO_ERRORI_SYNC.DESTINAZIONE_INCOMPLETA, manager, id);
      return new Decimal(0);
    }

    if (cfOriginDefault) {
      const km = await this.fetchGoogleDistanza(
        xVolte,
        manager,
        cfOriginDefault,
        REGIONE,
        STATO, // att.ne va preso dalla testata del cliente - per le sedi commerciali funziona così
        PROVINCIA,
        COMUNE,
        CAP,
        INDIRIZZO,
      );

      console.info(`Km da CF_COMM: ${id} -> ${km}`);

      return km;
    } else {
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

      console.info(`Km da CF_COMM: ${id} -> ${km}`);

      return km;
    }
  }

  //
  // Cerco nelle configurazioni dei costi impostati per CF_COMM (testata o sede) il codice articolo di riferimento per impostare il costo della trasferta (pernotto si no etc)
  async CercoEpsNestjsArticoliCosti(
    manager: EntityManager,
    CF_COMM_ID: string,
    COD_CF: string,
    TIPO_TRASFERTA: TipoTrasferta,
  ): Promise<ArtAnaEntity | null> {
    // ricerca per cf_comm (sempre definita in ordine cliente - sezione prima facciata)
    const articoliCostiCfComm = await manager
      .getRepository(ArticoliCostiCfCommEntity)
      .createQueryBuilder('articoliCostiCfCommEntity')
      .select()
      .innerJoinAndSelect('articoliCostiCfCommEntity.artAna', 'artAnaEntity')
      .where('articoliCostiCfCommEntity.CF_COMM_ID=:CF_COMM_ID AND articoliCostiCfCommEntity.TIPO_TRASFERTA=:TIPO_TRASFERTA', {
        CF_COMM_ID,
        TIPO_TRASFERTA,
      })
      .getOne();

    if (articoliCostiCfComm?.artAna) {
      return articoliCostiCfComm.artAna;
    }

    // ricerca per cf (testata)
    const articoliCostiCf = await manager
      .getRepository(ArticoliCostiCfEntity)
      .createQueryBuilder('articoliCostiCfEntity')
      .select()
      .innerJoinAndSelect('articoliCostiCfEntity.artAna', 'artAnaEntity')
      .where('articoliCostiCfEntity.COD_CF=:COD_CF AND articoliCostiCfEntity.TIPO_TRASFERTA=:TIPO_TRASFERTA', {
        COD_CF,
        TIPO_TRASFERTA,
      })
      .getOne();

    if (articoliCostiCf?.artAna) {
      return articoliCostiCf.artAna;
    }

    // ricerca nell'unica e ultima spiaggia - quella di default generale DEFAULT_CF
    const articoliCostiCfDefault = await manager
      .getRepository(ArticoliCostiCfEntity)
      .createQueryBuilder('articoliCostiCfEntity')
      .select()
      .innerJoinAndSelect('articoliCostiCfEntity.artAna', 'artAnaEntity')
      .where('articoliCostiCfEntity.COD_CF=:COD_CF AND articoliCostiCfEntity.TIPO_TRASFERTA=:TIPO_TRASFERTA', {
        COD_CF: DEFAULT.COD_CF,
        TIPO_TRASFERTA,
      })
      .getOne();

    return articoliCostiCfDefault?.artAna || null;
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

  private makeComponentiOrpEff(DOC_RIGA_ID: string, COD_ART: string, QUANT: Decimal, DES_DIST: string): string {
    const copyAppReqComponentiText = [...appReqComponentiDefaultParams];

    copyAppReqComponentiText[1] = DOC_RIGA_ID;

    copyAppReqComponentiText[8] = COD_ART;
    copyAppReqComponentiText[11] = QUANT.toDecimalPlaces(2, Decimal.ROUND_UP).toString().replace('.', ','); // Att.ne in HG il separatore decimale a servizio vuole una virgola

    copyAppReqComponentiText[14] = DES_DIST;

    return copyAppReqComponentiText.join('');
  }

  async fetchGoogleDistanza(
    xVolte: number,
    entityManager: EntityManager,
    cfOriginPartenza: CfEntity,
    REGIONE: string | null,
    STATO_CF: string | null,
    PROVINCIA_CF: string | null,
    COMUNE_CF: string | null,
    CAP_CF: string | null,
    INDI_CF: string | null,
  ): Promise<Decimal> {
    const apiKey = process.env.GOOGLE_API_MAP; // Sostituisci con la tua API Key di Google
    const baseUrl = process.env.GOOGLE_DATA_MATRIX || '';

    const origins = [
      //cfSedePrincipale.REGIONE,
      cfOriginPartenza.STATO_CF,
      cfOriginPartenza.PROVINCIA_CF,
      cfOriginPartenza.COMUNE_CF,
      cfOriginPartenza.CAP_CF,
      cfOriginPartenza.INDI_CF,
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

    // le destinazioni ora dipendono anche dall'origine
    const result = await entityManager.getRepository(EpsNestjsDestinazioniEntity).find({ where: { LINK: _origin + _destination } });

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
                  LINK: _origin + _destination, // le destinazioni ora dipendono anche dall'origine
                },
              ])
              .execute();

            return new Decimal(metri).mul(xVolte).dividedBy(1000).toDecimalPlaces(1); // Round to 1 decimal place
          }
        } else {
          throw new Error(`Errore nella richiesta: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Errore durante la richiesta a Google Distance Matrix:', error);
        throw error;
      }
    } else {
      return new Decimal(result[0].VALUE).mul(xVolte).dividedBy(1000).toDecimalPlaces(1);
    }

    return new Decimal(0);
  }

  // -----------------------------------------------------------------------

  async SalvoConErroreEsecuzione(tipo: TIPO_ERRORI_SYNC, manager: EntityManager, id: string, idfk?: string) {
    const result = await manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder()
      .update()
      .set({ HYPSERV_REQ2_COD_CHIAVE: '-1', ERROR_SYNC: tipo })
      .where('id = :id', { id })
      .execute();

    if (idfk) {
      await manager
        .getRepository(EpsNestjsOrpEffCicliEsecChildEntity)
        .createQueryBuilder()
        .update()
        .set({ HYPSERV_REQ2_COD_CHIAVE: '-1', ERROR_SYNC: tipo })
        .where('id = :idfk', { idfk })
        .execute();
    }
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
