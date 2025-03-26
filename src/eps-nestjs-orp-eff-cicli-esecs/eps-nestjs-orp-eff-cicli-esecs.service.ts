import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { EpsNestjsOrpEffCicliEsec } from './domain/eps-nestjs-orp-eff-cicli-esec';
import { CreateEpsNestjsOrpEffCicliEsecDto } from './dto/create-eps-nestjs-orp-eff-cicli-esec.dto';
import { UpdateEpsNestjsOrpEffCicliEsecDto } from './dto/update-esp-nestjs-orp-eff-cicli-esec.dto';
import { EpsNestjsOrpEffCicliEsecRepository } from './infrastructure/persistence/eps-nestjs-orp-eff-cicli-esec.repository';
import { SessionService } from '../session/session.service';
import { UsersService } from '../users/users.service';
import { FilterDto, SortDto } from '../utils/dto/filter-column';
import { EpsNestjsOrpEffCicliEsecDto } from './dto/esp-nestjs-orp-eff-cicli-esec.dto';
import { UserEntity } from '../users/infrastructure/persistence/relational/entities/user.entity';
import { User } from '../users/domain/user';

@Injectable()
export class EpsNestjsOrpEffCicliEsecsService {
  constructor(
    // Dependencies here
    private readonly epsNestjsOrpEffCicliEsecRepository: EpsNestjsOrpEffCicliEsecRepository,
    private readonly usersService: UsersService,
    // private sessionService: SessionService,
  ) {}

  async create(
    createEspNestjsOrpEffCicliEsecDto: CreateEpsNestjsOrpEffCicliEsecDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.epsNestjsOrpEffCicliEsecRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      NUM_RIGA: createEspNestjsOrpEffCicliEsecDto.NUM_RIGA,

      APP_REQ3_SYNCED: createEspNestjsOrpEffCicliEsecDto.APP_REQ3_SYNCED,

      TEMPO_MINUTI_OP: createEspNestjsOrpEffCicliEsecDto.TEMPO_MINUTI_OP,

      TEMPO_MINUTI_MACC: createEspNestjsOrpEffCicliEsecDto.TEMPO_MINUTI_MACC,

      NOTE: createEspNestjsOrpEffCicliEsecDto.NOTE,

      DATA_FINE: createEspNestjsOrpEffCicliEsecDto.DATA_FINE,

      DATA_INIZIO: createEspNestjsOrpEffCicliEsecDto.DATA_INIZIO,

      TEMPO_OPERATORE: createEspNestjsOrpEffCicliEsecDto.TEMPO_OPERATORE,

      TEMPO_MACCHINA: createEspNestjsOrpEffCicliEsecDto.TEMPO_MACCHINA,

      COD_OP: createEspNestjsOrpEffCicliEsecDto.COD_OP,

      COD_ART: createEspNestjsOrpEffCicliEsecDto.COD_ART,

      DOC_RIGA_ESEC_ID: createEspNestjsOrpEffCicliEsecDto.DOC_RIGA_ESEC_ID,

      DOC_RIGA_ID: createEspNestjsOrpEffCicliEsecDto.DOC_RIGA_ID,

      DOC_ID: createEspNestjsOrpEffCicliEsecDto.DOC_ID,

      AZIENDA_ID: createEspNestjsOrpEffCicliEsecDto.AZIENDA_ID,
    });
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
    user: User;
  }) {
    const currentUser = await this.usersService.findById(user.id);
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

  findById(id: EpsNestjsOrpEffCicliEsec['id']) {
    return this.epsNestjsOrpEffCicliEsecRepository.findById(id);
  }

  findByIds(ids: EpsNestjsOrpEffCicliEsec['id'][]) {
    return this.epsNestjsOrpEffCicliEsecRepository.findByIds(ids);
  }

  async update(
    id: EpsNestjsOrpEffCicliEsec['id'],

    updateEspNestjsOrpEffCicliEsecDto: UpdateEpsNestjsOrpEffCicliEsecDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.epsNestjsOrpEffCicliEsecRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      NUM_RIGA: updateEspNestjsOrpEffCicliEsecDto.NUM_RIGA,

      APP_REQ3_SYNCED: updateEspNestjsOrpEffCicliEsecDto.APP_REQ3_SYNCED,

      TEMPO_MINUTI_OP: updateEspNestjsOrpEffCicliEsecDto.TEMPO_MINUTI_OP,

      TEMPO_MINUTI_MACC: updateEspNestjsOrpEffCicliEsecDto.TEMPO_MINUTI_MACC,

      NOTE: updateEspNestjsOrpEffCicliEsecDto.NOTE,

      DATA_FINE: updateEspNestjsOrpEffCicliEsecDto.DATA_FINE,

      DATA_INIZIO: updateEspNestjsOrpEffCicliEsecDto.DATA_INIZIO,

      TEMPO_OPERATORE: updateEspNestjsOrpEffCicliEsecDto.TEMPO_OPERATORE,

      TEMPO_MACCHINA: updateEspNestjsOrpEffCicliEsecDto.TEMPO_MACCHINA,

      COD_OP: updateEspNestjsOrpEffCicliEsecDto.COD_OP,

      COD_ART: updateEspNestjsOrpEffCicliEsecDto.COD_ART,

      DOC_RIGA_ESEC_ID: updateEspNestjsOrpEffCicliEsecDto.DOC_RIGA_ESEC_ID,

      DOC_RIGA_ID: updateEspNestjsOrpEffCicliEsecDto.DOC_RIGA_ID,

      DOC_ID: updateEspNestjsOrpEffCicliEsecDto.DOC_ID,

      AZIENDA_ID: updateEspNestjsOrpEffCicliEsecDto.AZIENDA_ID,
    });
  }

  remove(id: EpsNestjsOrpEffCicliEsec['id']) {
    return this.epsNestjsOrpEffCicliEsecRepository.remove(id);
  }
}
