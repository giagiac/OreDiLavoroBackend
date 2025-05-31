import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../users/infrastructure/persistence/relational/entities/user.entity';
import { UsersService } from '../users/users.service';
import { FilterDto, SortDto } from '../utils/dto/filter-column';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { EpsNestjsOrpEffCicliEsec } from './domain/eps-nestjs-orp-eff-cicli-esec';
import { CreateEpsNestjsOrpEffCicliEsecDto } from './dto/create-eps-nestjs-orp-eff-cicli-esec.dto';
import { EpsNestjsOrpEffCicliEsecDto } from './dto/esp-nestjs-orp-eff-cicli-esec.dto';
import { UpdateEpsNestjsOrpEffCicliEsecDto } from './dto/update-esp-nestjs-orp-eff-cicli-esec.dto';
import { EpsNestjsOrpEffCicliEsecRepository } from './infrastructure/persistence/eps-nestjs-orp-eff-cicli-esec.repository';
import { EpsNestjsOrpEffCicliEsecChildRepository } from '../eps-nestjs-orp-eff-cicli-esec-children/infrastructure/persistence/eps-nestjs-orp-eff-cicli-esec-child.repository';

@Injectable()
export class EpsNestjsOrpEffCicliEsecsService {
  constructor(
    // Dependencies here
    private readonly epsNestjsOrpEffCicliEsecRepository: EpsNestjsOrpEffCicliEsecRepository,
    private readonly epsNestjsOrpEffCicliEsecChildRepository: EpsNestjsOrpEffCicliEsecChildRepository,
    private readonly usersService: UsersService,
    // private sessionService: SessionService,
  ) {}

  async create(createEpsNestjsOrpEffCicliEsecDto: CreateEpsNestjsOrpEffCicliEsecDto, user: UserEntity) {
    // Do not remove comment below.
    // <creating-property />

    const currentUser = await this.usersService.findById(user.id);

    if (currentUser?.COD_OP == null) {
      throw new HttpException(
        {
          errors: {
            message: 'Codice Operatore HG in tabella user non definito',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.epsNestjsOrpEffCicliEsecRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ERROR_SYNC: createEpsNestjsOrpEffCicliEsecDto.ERROR_SYNC,

      APP_REQ3_HYPSERV_COD_CHIAVE: createEpsNestjsOrpEffCicliEsecDto.APP_REQ3_HYPSERV_COD_CHIAVE,

      HYPSERV_REQ2_COD_CHIAVE: createEpsNestjsOrpEffCicliEsecDto.HYPSERV_REQ2_COD_CHIAVE,

      KM: createEpsNestjsOrpEffCicliEsecDto.KM,

      TIPO_TRASFERTA: createEpsNestjsOrpEffCicliEsecDto.TIPO_TRASFERTA,

      NUM_RIGA: createEpsNestjsOrpEffCicliEsecDto.NUM_RIGA,

      TEMPO_MINUTI_OP: createEpsNestjsOrpEffCicliEsecDto.TEMPO_MINUTI_OP,

      TEMPO_MINUTI_MACC: createEpsNestjsOrpEffCicliEsecDto.TEMPO_MINUTI_MACC,

      NOTE: createEpsNestjsOrpEffCicliEsecDto.NOTE,

      DATA_FINE: createEpsNestjsOrpEffCicliEsecDto.DATA_FINE,

      DATA_INIZIO: createEpsNestjsOrpEffCicliEsecDto.DATA_INIZIO,

      TEMPO_OPERATORE: createEpsNestjsOrpEffCicliEsecDto.TEMPO_OPERATORE?.toString(),

      TEMPO_MACCHINA: createEpsNestjsOrpEffCicliEsecDto.TEMPO_MACCHINA?.toString(),

      COD_OP: currentUser?.COD_OP,

      COD_ART: createEpsNestjsOrpEffCicliEsecDto.COD_ART,

      DOC_RIGA_ESEC_ID: createEpsNestjsOrpEffCicliEsecDto.DOC_RIGA_ESEC_ID,

      DOC_RIGA_ID: createEpsNestjsOrpEffCicliEsecDto.DOC_RIGA_ID,

      DOC_ID: createEpsNestjsOrpEffCicliEsecDto.DOC_ID,

      AZIENDA_ID: createEpsNestjsOrpEffCicliEsecDto.AZIENDA_ID,
    });
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
    user: UserEntity;
  }) {
    const currentUser = await this.usersService.findById(user.id);

    const DATA_INIZIO = filterOptions?.find((f) => f.columnName === 'DATA_INIZIO');
    const DATA_FINE = filterOptions?.find((f) => f.columnName === 'DATA_INIZIO'); // TODO: Att.ne tanto ho bisogno solo e sempre di quelli della data di oggi - mai span di archi temporali (altrimenti si andrà messo DATA_FINE)

    // Estrai l'id da filterOptions se presente
    const ID = filterOptions?.find((f) => f.columnName === 'id');

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

    filterOptions = new Array<FilterDto<EpsNestjsOrpEffCicliEsecDto>>();
    filterOptions.push({
      columnName: 'DATA_INIZIO',
      value: targetDateInizio.toISOString(),
    });
    filterOptions.push({
      columnName: 'DATA_FINE',
      value: targetDateFine.toISOString(),
    });

    if (ID) {
      filterOptions.push({
        columnName: 'id',
        value: ID.value,
      });
    }

    return this.epsNestjsOrpEffCicliEsecRepository.findAllWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      user: currentUser,
    });
  }

  async findById(id: EpsNestjsOrpEffCicliEsec['id'], user: UserEntity) {
    const currentUser = await this.usersService.findById(user.id);

    return this.epsNestjsOrpEffCicliEsecRepository.findById(id, currentUser);
  }

  findByIds(ids: EpsNestjsOrpEffCicliEsec['id'][]) {
    return this.epsNestjsOrpEffCicliEsecRepository.findByIds(ids);
  }

  async update(id: EpsNestjsOrpEffCicliEsec['id'], updateEpsNestjsOrpEffCicliEsecDto: UpdateEpsNestjsOrpEffCicliEsecDto) {
    // Do not remove comment below.
    // <updating-property />

    return this.epsNestjsOrpEffCicliEsecRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ERROR_SYNC: updateEpsNestjsOrpEffCicliEsecDto.ERROR_SYNC,

      APP_REQ3_HYPSERV_COD_CHIAVE: updateEpsNestjsOrpEffCicliEsecDto.APP_REQ3_HYPSERV_COD_CHIAVE,

      HYPSERV_REQ2_COD_CHIAVE: updateEpsNestjsOrpEffCicliEsecDto.HYPSERV_REQ2_COD_CHIAVE,

      KM: updateEpsNestjsOrpEffCicliEsecDto.KM,

      TIPO_TRASFERTA: updateEpsNestjsOrpEffCicliEsecDto.TIPO_TRASFERTA,

      NUM_RIGA: updateEpsNestjsOrpEffCicliEsecDto.NUM_RIGA,

      TEMPO_MINUTI_OP: updateEpsNestjsOrpEffCicliEsecDto.TEMPO_MINUTI_OP,

      TEMPO_MINUTI_MACC: updateEpsNestjsOrpEffCicliEsecDto.TEMPO_MINUTI_MACC,

      NOTE: updateEpsNestjsOrpEffCicliEsecDto.NOTE,

      DATA_FINE: updateEpsNestjsOrpEffCicliEsecDto.DATA_FINE,

      DATA_INIZIO: updateEpsNestjsOrpEffCicliEsecDto.DATA_INIZIO,

      TEMPO_OPERATORE: updateEpsNestjsOrpEffCicliEsecDto.TEMPO_OPERATORE?.toString(),

      TEMPO_MACCHINA: updateEpsNestjsOrpEffCicliEsecDto.TEMPO_MACCHINA?.toString(),

      COD_OP: updateEpsNestjsOrpEffCicliEsecDto.COD_OP,

      COD_ART: updateEpsNestjsOrpEffCicliEsecDto.COD_ART,

      DOC_RIGA_ESEC_ID: updateEpsNestjsOrpEffCicliEsecDto.DOC_RIGA_ESEC_ID,

      DOC_RIGA_ID: updateEpsNestjsOrpEffCicliEsecDto.DOC_RIGA_ID,

      DOC_ID: updateEpsNestjsOrpEffCicliEsecDto.DOC_ID,

      AZIENDA_ID: updateEpsNestjsOrpEffCicliEsecDto.AZIENDA_ID,
    });
  }

  async remove(id: EpsNestjsOrpEffCicliEsec['id'], user: UserEntity) {
    // TODO: il check VA EFFETTUATO per COD_CHIAVE sia del componente che dell'esecuzione
    const currentUser = await this.usersService.findById(user.id);
    const result = await this.epsNestjsOrpEffCicliEsecRepository.findById(id, currentUser);
    if (!result) {
      throw new HttpException(
        {
          errors: {
            message: 'Record non trovato',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (result.HYPSERV_REQ2_COD_CHIAVE != null || result.APP_REQ3_HYPSERV_COD_CHIAVE != null) {
      throw new HttpException(
        {
          errors: {
            message: 'Record già processato',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.epsNestjsOrpEffCicliEsecRepository.remove(id);
  }
}
