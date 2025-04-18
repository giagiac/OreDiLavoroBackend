import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { EntityManager, In, Repository } from 'typeorm';
import { AppReq3HypServEntity } from '../../../../../app-req3-hyp-servs/infrastructure/persistence/relational/entities/app-req3-hyp-serv.entity';
import { CfEntity } from '../../../../../cfs/infrastructure/persistence/relational/entities/cf.entity';
import { EpsNestjsDestinazioniEntity } from '../../../../../eps-nestjs-destinazionis/infrastructure/persistence/relational/entities/eps-nestjs-destinazioni.entity';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';
import { HypServReq2Entity } from '../../../../../hyp-serv-req2/infrastructure/persistence/relational/entities/hyp-serv-req2.entity';
import { RoleEnum } from '../../../../../roles/roles.enum';
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
import Decimal from 'decimal.js';

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
export class ScheduleTasksRelationalRepository
  implements ScheduleTasksRepository
{
  constructor(
    @InjectRepository(ScheduleTasksEntity)
    private readonly scheduleTasksRepository: Repository<ScheduleTasksEntity>,
    @InjectRepository(EpsNestjsOrpEffCicliEsecEntity)
    private readonly epsNestjsOrpEffCicliEsecRepository: Repository<EpsNestjsOrpEffCicliEsecEntity>,
    @InjectRepository(AppReq3HypServEntity)
    private readonly appReq3HypServRepository: Repository<AppReq3HypServEntity>,
    @InjectRepository(EpsNestjsDestinazioniEntity)
    private readonly epsNestjsDestinazioniRepository: Repository<EpsNestjsDestinazioniEntity>,
    @InjectRepository(HypServReq2Entity)
    private readonly hypServReq2Repository: Repository<HypServReq2Entity>,
  ) {}

  async create(data: ScheduleTasks): Promise<ScheduleTasks> {
    const persistenceModel = ScheduleTasksMapper.toPersistence(data);
    const newEntity = await this.scheduleTasksRepository.save(
      this.scheduleTasksRepository.create(persistenceModel),
    );
    return ScheduleTasksMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ScheduleTasks[]> {
    const entities = await this.scheduleTasksRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ScheduleTasksMapper.toDomain(entity));
  }

  async findById(
    id: ScheduleTasks['id'],
  ): Promise<NullableType<ScheduleTasks>> {
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

  async update(
    id: ScheduleTasks['id'],
    payload: Partial<ScheduleTasks>,
  ): Promise<ScheduleTasks> {
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

  async findAllEsec(): Promise<any> {
    // const esecs = this.epsNestjsOrpEffCicliEsecEntity.findAndCount()
    // return esecs;

    return this.epsNestjsOrpEffCicliEsecRepository.manager.transaction(
      async (manager) => {
        const entitiesSqlCfSedePrincipale = manager
          .getRepository(CfEntity)
          .createQueryBuilder()
          .where('COD_CF=:COD_CF', { COD_CF: process.env.GOOGLE_COD_CF_SEDE });

        const cfEntity = await entitiesSqlCfSedePrincipale.getOne();
        if (!cfEntity) {
          throw new Error('Cf sede principale non definita...');
        }
        this.cfSedePrincipale = cfEntity;

        // Usa il manager per eseguire query all'interno della transazione
        const entitiesSql = manager
          .getRepository(EpsNestjsOrpEffCicliEsecEntity)
          .createQueryBuilder('epsNestjsOrpEffCicliEsec')
          .innerJoinAndSelect('epsNestjsOrpEffCicliEsec.operatori', 'operatori')
          .innerJoinAndSelect('operatori.user', 'user')
          .innerJoinAndSelect('user.role', 'role')

          .leftJoinAndSelect('epsNestjsOrpEffCicliEsec.hypServReq2', 'hypServReq2')
          .leftJoinAndSelect(
            'epsNestjsOrpEffCicliEsec.appReq3HypServ',
            'appReq3HypServ',
          )
          .leftJoinAndSelect(
            'epsNestjsOrpEffCicliEsec.orpEffCicli',
            'orpEffCicli',
          )
          .leftJoinAndSelect('orpEffCicli.orpEff', 'orpEff')
          .leftJoinAndSelect('orpEffCicli.linkOrpOrd', 'linkOrpOrd')
          .leftJoinAndSelect('linkOrpOrd.ordCliRighe', 'ordCliRighe')
          .leftJoinAndSelect('ordCliRighe.ordCliTras', 'ordCliTras')
          .leftJoinAndSelect('ordCliRighe.cf', 'cf')
          .leftJoinAndSelect('orpEff.x1TrasCodici', 'x1TrasCodici')
          .select()
          .addSelect(
            `TO_CHAR("ordCliRighe".DATA_DOC, 'YY') || "x1TrasCodici".CODICE2 || "orpEff".NUM_DOC || '-' || "orpEffCicli".NUM_RIGA`,
            'CODICE_BREVE',
          )
          .andWhere('SYNCED = 0 OR SYNCED IS NULL');

        const entities = await entitiesSql.getMany();

        for (const entity of entities) {
          if (
            entity.DOC_RIGA_ID == null ||
            entity.COD_OP == null ||
            entity.DATA_INIZIO == null ||
            entity.DATA_FINE == null ||
            entity.TEMPO_OPERATORE == null
          ) {
            await this.SalvoConErrore(
              TIPO_ERRORI_SYNC.MANCANZA_DATI_SET_MINIMO,
              manager,
              entity.id,
            );
            return;
          }

          switch (entity.TIPO_TRASFERTA) {
            case 'in_sede':
              // genero solo l'esecuzione
              await this.GeneroEsecuzioniOperatore(manager, entity);
              break;
            case 'in_giornata':
              // genero -> esecuzione e componente con calcolo costo (dataMatrix) KM x2
              await this.GeneroEsecuzioniOperatore(manager, entity);
              await this.GeneroComponentiCiclo(2, null, manager, entity);
              break;
            case 'in_giornata_dopo_21':
              // genero -> esecuzione e componente con calcolo costo (dataMatrix) KM x2
              await this.GeneroEsecuzioniOperatore(manager, entity);
              await this.GeneroComponentiCiclo(2, null, manager, entity);
              break;
            case 'fuori_sede_andata':
              // genero -> esecuzione e componente con calcolo costo (dataMatrix) KM x1
              await this.GeneroEsecuzioniOperatore(manager, entity);
              await this.GeneroComponentiCiclo(1, null, manager, entity);
              break;
            case 'fuori_sede_ritorno':
              // genero -> esecuzione e componente con calcolo costo (dataMatrix) KM x1
              await this.GeneroEsecuzioniOperatore(manager, entity);
              await this.GeneroComponentiCiclo(1, null, manager, entity);
              break;
            case 'ancora_in_missione_5':
              // genero -> esecuzione e componente con calcolo costo 5 KM x1
              await this.GeneroEsecuzioniOperatore(manager, entity);
              await this.GeneroComponentiCiclo(1, 5, manager, entity);
              break;
            case 'ancora_in_missione_10':
              // genero -> esecuzione e componente con calcolo costo 10 KM x1
              await this.GeneroEsecuzioniOperatore(manager, entity);
              await this.GeneroComponentiCiclo(1, 10, manager, entity);
              break;
            case 'ancora_in_missione_15':
              // genero -> esecuzione e componente con calcolo costo 15 KM x1
              await this.GeneroEsecuzioniOperatore(manager, entity);
              await this.GeneroComponentiCiclo(1, 15, manager, entity);
              break;
            case 'ancora_in_missione_20':
              // genero -> esecuzione e componente con calcolo costo 20 KM x1
              await this.GeneroEsecuzioniOperatore(manager, entity);
              await this.GeneroComponentiCiclo(1, 20, manager, entity);
              break;
            case 'step1_KmAutista':
              // genero -> componente con calcolo costo KM x1
              await this.GeneroEsecuzioniOperatore(manager, entity);
              await this.GeneroComponentiCiclo(
                1,
                entity.KM || 0,
                manager,
                entity,
              );
              break;
            default:
              throw Error(`${entity.TIPO_TRASFERTA} TIPO_TRASFERTA previsto`);
          }
        }

        return {
          data: {
            list: [],
          },
        };
      },
    );
  }

  async GeneroEsecuzioniOperatore(
    manager: EntityManager,
    entity: EpsNestjsOrpEffCicliEsecEntity,
  ) {
    if (
      entity.DOC_RIGA_ID != null &&
      entity.COD_OP != null &&
      entity.DATA_INIZIO != null &&
      entity.DATA_FINE != null &&
      entity.TEMPO_OPERATORE != null
    ) {
      const max = await manager
        .getRepository(HypServReq2Entity)
        .createQueryBuilder()
        .select('MAX(PROGR) + 1', 'maxProgr')
        .getRawOne();

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
            ),
          },
        ])
        .execute();

      const update = await manager
        .getRepository(EpsNestjsOrpEffCicliEsecEntity)
        .createQueryBuilder()
        .update()
        .set({ SYNCED: 1, HYPSERV_REQ2_COD_CHIAVE: entity.id })
        .where('id = :id', { id: entity.id })
        .execute();
    } else {
      console.error('Non tutti i parametri previsti sono stati definiti');
    }
  }

  async GeneroComponentiCiclo(
    xVolte: number,
    kmManuali: number | null,
    manager: EntityManager,
    entity: EpsNestjsOrpEffCicliEsecEntity,
  ) {
    if (
      entity.DOC_RIGA_ID != null &&
      entity.COD_OP != null &&
      entity.DATA_INIZIO != null &&
      entity.DATA_FINE != null &&
      entity.TEMPO_OPERATORE != null
    ) {
      const role = entity.operatori?.user?.role;
      if (RoleEnum.autista != role?.id) {
        // non sono autista
        return;
      }
      if (entity.COD_ART == null) {
        await this.SalvoConErrore(
          TIPO_ERRORI_SYNC.MANCANZA_COD_ART_COMP,
          manager,
          entity.id,
        );
        return;
      }

      const max = await manager
        .getRepository(HypServReq2Entity)
        .createQueryBuilder()
        .select('MAX(PROGR) + 1', 'maxProgr')
        .getRawOne();

      if (entity.orpEffCicli?.linkOrpOrd?.length ?? 0 > 0) {
        if (
          entity.orpEffCicli?.linkOrpOrd?.[0]?.ordCliRighe?.cf != null ||
          entity.orpEffCicli?.linkOrpOrd?.[0]?.ordCliRighe?.ordCliTras != null
        ) {
          if (
            entity.orpEffCicli?.linkOrpOrd?.[0]?.ordCliRighe?.ordCliTras
              ?.NUM_DEST != null
          ) {
            // cerco nelle SEDI
            const ordCliTras =
              entity.orpEffCicli?.linkOrpOrd?.[0]?.ordCliRighe?.ordCliTras;
            let km = String(kmManuali);
            if (kmManuali == null) {
              km = await this.fetchGoogleDistanza(
                xVolte,
                manager,
                this.cfSedePrincipale,
                '',
                ordCliTras.STATO_DEST_MERCE || '',
                ordCliTras.PROVINCIA_DEST_MERCE || '',
                ordCliTras.COMUNE_DEST_MERCE || '',
                ordCliTras.CAP_DEST_MERCE || '',
                ordCliTras.INDI_DEST_MERCE || '',
              );
            }
            console.info(`Km sede principale: ${entity.id} -> ${km}`);

            const componente = this.makeComponentiOrpEff(
              entity.orpEffCicli.DOC_ID,
              entity.COD_ART,
              km,
            );

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
                  COD_REQ3_HYPSERV:
                    APP_REQ3_HYPSERV_TIPO_RICHIESTA.COMPONENTI_ORP_EFF,
                  CAMPO_PARAMETRI: componente,
                },
              ])
              .execute();
          } else {
            // cerco nella testata
            const cf = entity.orpEffCicli?.linkOrpOrd?.[0]?.ordCliRighe.cf;
            let km = String(kmManuali);
            if (kmManuali == null) {
              km = await this.fetchGoogleDistanza(
                xVolte,
                manager,
                this.cfSedePrincipale,
                '',
                cf?.STATO_CF || '',
                cf?.PROVINCIA_CF || '',
                cf?.COMUNE_CF || '',
                cf?.CAP_CF || '',
                cf?.INDI_CF || '',
              );
            }
            console.info(`Km destinazione: ${entity.id} -> ${km}`);

            const componente = this.makeComponentiOrpEff(
              entity.orpEffCicli.DOC_ID,
              entity.COD_ART,
              km,
            );

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
                  COD_REQ3_HYPSERV:
                    APP_REQ3_HYPSERV_TIPO_RICHIESTA.COMPONENTI_ORP_EFF,
                  CAMPO_PARAMETRI: componente,
                },
              ])
              .execute();
          }

          const update = await manager
            .getRepository(EpsNestjsOrpEffCicliEsecEntity)
            .createQueryBuilder()
            .update()
            .set({ SYNCED: 1, APP_REQ3_HYPSERV_COD_CHIAVE: entity.id })
            .where('id = :id', { id: entity.id })
            .execute();
        } else {
          await this.SalvoConErrore(
            TIPO_ERRORI_SYNC.MANCANZA_ORD_CLI_RIGHE_COD_CF,
            manager,
            entity.id,
          );
        }
      } else {
        await this.SalvoConErrore(
          TIPO_ERRORI_SYNC.MANCANZA_LINK_ORP_ORD,
          manager,
          entity.id,
        );
      }
    } else {
      console.error('Non tutti i parametri previsti sono stati definiti');
    }
  }

  private makeEsecuzioneOrpEffCicli(
    DOC_RIGA_ID: string,
    COD_OP: string,
    DATA_INIZIO: Date,
    DATA_FINE: Date,
    TEMPO_OPERATORE: string,
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

    copyHypservText[3] =
      transformer.convertiPerServizioHG(DATA_INIZIO) + '0000' + separator;
    copyHypservText[4] =
      transformer.convertiPerServizioHG(DATA_FINE) + '0000' + separator;

    copyHypservText[18] = transformer.convertInMinuti(TEMPO_OPERATORE);

    return copyHypservText.join('');
  }

  private makeComponentiOrpEff(
    DOC_RIGA_ID: string,
    COD_ART: string,
    QUANT_DIST: string,
  ): string {
    const copyAppReqComponentiText = [...appReqComponentiDefaultParams];

    copyAppReqComponentiText[1] = DOC_RIGA_ID;

    copyAppReqComponentiText[8] = COD_ART;
    copyAppReqComponentiText[11] = QUANT_DIST;

    return copyAppReqComponentiText.join('');
  }

  async fetchGoogleDistanza(
    xVolte: number,
    entityManager: EntityManager,
    cfSedePrincipale: CfEntity | null,
    REGIONE: string | null,
    STATO_CF: string | null,
    PROVINCIA_CF: string | null,
    COMUNE_CF: string | null,
    CAP_CF: string | null,
    INDI_CF: string | null,
  ): Promise<string> {
    const apiKey = process.env.GOOGLE_API_MAP; // Sostituisci con la tua API Key di Google
    const baseUrl = process.env.GOOGLE_DATA_MATRIX || '';

    if (cfSedePrincipale == null) throw Error('Sede principale non definita');

    const origins = [
      //cfSedePrincipale.REGIONE,
      cfSedePrincipale.STATO_CF,
      cfSedePrincipale.PROVINCIA_CF,
      cfSedePrincipale.COMUNE_CF,
      cfSedePrincipale.CAP_CF,
      cfSedePrincipale.INDI_CF,
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

    const result = await entityManager
      .getRepository(EpsNestjsDestinazioniEntity)
      .find({ where: { LINK: _destination } });

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
          if (
            response.data.rows.length > 0 &&
            response.data.rows[0].elements.length > 0
          ) {
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

            return new Decimal(metri)
              .mul(xVolte)
              .dividedBy(1000)
              .toDecimalPlaces(1)
              .toString()
              .replace('.', ','); // Round to 1 decimal place
          }
        } else {
          throw new Error(`Errore nella richiesta: ${response.statusText}`);
        }
      } catch (error) {
        console.error(
          'Errore durante la richiesta a Google Distance Matrix:',
          error,
        );
        throw error;
      }
    } else {
      return new Decimal(result[0].VALUE)
        .mul(xVolte)
        .dividedBy(1000)
        .toDecimalPlaces(1)
        .toString()
        .replace('.', ',');
    }

    return '0';
  }

  // -----------------------------------------------------------------------

  async SalvoConErrore(
    tipo: TIPO_ERRORI_SYNC,
    manager: EntityManager,
    id: string,
  ) {
    const result = await manager
      .getRepository(EpsNestjsOrpEffCicliEsecEntity)
      .createQueryBuilder()
      .update()
      .set({ SYNCED: tipo })
      .where('id = :id', { id })
      .execute();
  }
}
