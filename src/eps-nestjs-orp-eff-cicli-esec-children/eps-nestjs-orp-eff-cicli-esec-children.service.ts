import { Injectable } from '@nestjs/common';
import { User as UserType } from '../users/domain/user';
import { FilterDto, SortDto } from '../utils/dto/filter-column';
import { EpsNestjsOrpEffCicliEsecChild } from './domain/eps-nestjs-orp-eff-cicli-esec-child';
import { CreateEpsNestjsOrpEffCicliEsecChildDto } from './dto/create-eps-nestjs-orp-eff-cicli-esec-child.dto';
import { EpsNestjsOrpEffCicliEsecChildDto } from './dto/eps-nestjs-orp-eff-cicli-esec-child.dto';
import { UpdateEpsNestjsOrpEffCicliEsecChildDto } from './dto/update-eps-nestjs-orp-eff-cicli-esec-child.dto';
import { EpsNestjsOrpEffCicliEsecChildRepository } from './infrastructure/persistence/eps-nestjs-orp-eff-cicli-esec-child.repository';

@Injectable()
export class EpsNestjsOrpEffCicliEsecChildrenService {
  constructor(
    // Dependencies here
    private readonly epsNestjsOrpEffCicliEsecChildRepository: EpsNestjsOrpEffCicliEsecChildRepository,
  ) {}

  async create(createEpsNestjsOrpEffCicliEsecChildDto: CreateEpsNestjsOrpEffCicliEsecChildDto, user: UserType) {
    // Do not remove comment below.
    // <creating-property />

    // Do not remove comment below.
    // <creating-property />

    return this.epsNestjsOrpEffCicliEsecChildRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ERROR_SYNC: createEpsNestjsOrpEffCicliEsecChildDto.ERROR_SYNC,
      APP_REQ3_HYPSERV_COD_CHIAVE: createEpsNestjsOrpEffCicliEsecChildDto.APP_REQ3_HYPSERV_COD_CHIAVE,
      HYPSERV_REQ2_COD_CHIAVE: createEpsNestjsOrpEffCicliEsecChildDto.HYPSERV_REQ2_COD_CHIAVE,
      KM: createEpsNestjsOrpEffCicliEsecChildDto.KM,
      TIPO_TRASFERTA: createEpsNestjsOrpEffCicliEsecChildDto.TIPO_TRASFERTA,
      NUM_RIGA: createEpsNestjsOrpEffCicliEsecChildDto.NUM_RIGA,
      TEMPO_MINUTI_OP: createEpsNestjsOrpEffCicliEsecChildDto.TEMPO_MINUTI_OP,
      TEMPO_MINUTI_MACC: createEpsNestjsOrpEffCicliEsecChildDto.TEMPO_MINUTI_MACC,
      NOTE: createEpsNestjsOrpEffCicliEsecChildDto.NOTE,
      DATA_FINE: createEpsNestjsOrpEffCicliEsecChildDto.DATA_FINE,
      DATA_INIZIO: createEpsNestjsOrpEffCicliEsecChildDto.DATA_INIZIO,
      TEMPO_OPERATORE: createEpsNestjsOrpEffCicliEsecChildDto.TEMPO_OPERATORE?.toString(),
      TEMPO_MACCHINA: createEpsNestjsOrpEffCicliEsecChildDto.TEMPO_MACCHINA?.toString(),
      COD_OP: user?.COD_OP,
      COD_ART: createEpsNestjsOrpEffCicliEsecChildDto.COD_ART,
      DOC_RIGA_ESEC_ID: createEpsNestjsOrpEffCicliEsecChildDto.DOC_RIGA_ESEC_ID,
      DOC_RIGA_ID: createEpsNestjsOrpEffCicliEsecChildDto.DOC_RIGA_ID,
      DOC_ID: createEpsNestjsOrpEffCicliEsecChildDto.DOC_ID,
      AZIENDA_ID: createEpsNestjsOrpEffCicliEsecChildDto.AZIENDA_ID,
      idfk: createEpsNestjsOrpEffCicliEsecChildDto.idfk,
    });
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
  }: {
    filterOptions?: Array<FilterDto<EpsNestjsOrpEffCicliEsecChildDto>> | null;
    sortOptions?: Array<SortDto<EpsNestjsOrpEffCicliEsecChildDto>> | null;
  }) {
    const DATA_INIZIO = filterOptions?.find((f) => f.columnName === 'DATA_INIZIO');
    const DATA_FINE = filterOptions?.find((f) => f.columnName === 'DATA_INIZIO');
    const COD_OP = filterOptions?.find((f) => f.columnName === 'COD_OP');

    const targetDateInizio = new Date();
    const targetDateFine = new Date();

    if (DATA_INIZIO && DATA_INIZIO.value) {
      // Converti il valore di DATA_INIZIO in un oggetto Date
      targetDateInizio.setTime(Date.parse(DATA_INIZIO.value));
      targetDateInizio.setHours(0, 0, 0, 0);
      DATA_INIZIO.value = targetDateInizio.toISOString();
    }

    if (DATA_FINE && DATA_FINE.value) {
      // Converti il valore di DATA_FINE in un oggetto Date
      targetDateFine.setTime(Date.parse(DATA_FINE.value));
      targetDateFine.setHours(23, 59, 59, 999);
      DATA_FINE.value = targetDateFine.toISOString();
    }

    filterOptions = new Array<FilterDto<EpsNestjsOrpEffCicliEsecChildDto>>();
    filterOptions.push({
      columnName: 'DATA_INIZIO',
      value: targetDateInizio.toISOString(),
    });
    filterOptions.push({
      columnName: 'DATA_FINE',
      value: targetDateFine.toISOString(),
    });

    if (COD_OP) {
      filterOptions.push({
        columnName: 'COD_OP',
        value: COD_OP?.value,
      });
    }

    return this.epsNestjsOrpEffCicliEsecChildRepository.findAllWithPagination({
      filterOptions,
      sortOptions,
    });
  }

  findById(id: EpsNestjsOrpEffCicliEsecChild['id']) {
    return this.epsNestjsOrpEffCicliEsecChildRepository.findById(id);
  }

  findByIds(ids: EpsNestjsOrpEffCicliEsecChild['id'][]) {
    return this.epsNestjsOrpEffCicliEsecChildRepository.findByIds(ids);
  }

  async update(
    id: EpsNestjsOrpEffCicliEsecChild['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateEpsNestjsOrpEffCicliEsecChildDto: UpdateEpsNestjsOrpEffCicliEsecChildDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.epsNestjsOrpEffCicliEsecChildRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: EpsNestjsOrpEffCicliEsecChild['id']) {
    return this.epsNestjsOrpEffCicliEsecChildRepository.remove(id);
  }
}
