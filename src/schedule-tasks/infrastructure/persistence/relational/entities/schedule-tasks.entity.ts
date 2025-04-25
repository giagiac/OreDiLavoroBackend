import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'schedule_tasks',
})
export class ScheduleTasksEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// ------------------------------

interface Distance {
  text: string;
  value: number;
}

interface Duration {
  text: string;
  value: number;
}

interface Element {
  distance: Distance;
  duration: Duration;
  status: 'OK';
}

interface Row {
  elements: Element[];
}

export interface ApiResponse {
  rows: Row[];
  originAddresses: string[];
  destinationAddresses: string[];
}

// ------------------------------
// -------- SERVIZIO HG ---------
// ------------------------------

export enum FLAG_ESITO_ELAB {
  _0_FALLITO = 0,
  _1_RIUSCITA = 1,
}

export enum FLAG_STATUS {
  _0_IN_FASE_DI_COMPOSIZIONE = 0,
  _1_DA_ELABORARE = 1,
  _2_IN_ELABORAZIONE = 2,
  _3_ELABORATA = 3,
}

export enum HYPSERV_REQ2_TIPO_RICHIESTA {
  ESECUZIONI = '1',
}

export enum APP_REQ3_HYPSERV_TIPO_RICHIESTA {
  COMPONENTI_ORP_EFF = '10',
}

export const separator = '\r\n';

// ------------------------------
// -------- TIPI ERRORI ---------
// ------------------------------

export enum TIPO_ERRORI_SYNC {
  MANCANZA_DATI_SET_MINIMO = 2, // DOC_RIGA_ID - COD_OP - DATA_INIZIO - DATA_FINE - TEMPO_OPERATORE
  MANCANZA_LINK_ORP_ORD = 3, // NO ORDINE COLLEGATO
  MANCANZA_ORD_CLI_RIGHE_COD_CF = 4, // NO ORDINE COLLEGATO
  MANCANZA_ORD_CLI_RIGHE_CF_COMM_ID = 5, // NO ORDINE COLLEGATO
  MANCANZA_COD_ART_COMP = 6,
  MANCANZA_COD_ART_COSTI_CF_DEFAULT = 7,
  MANCANZA_ORD_CLI = 8,
  MANCANZA_RUOLO_TIPO_AUTISTA = 9,
}
