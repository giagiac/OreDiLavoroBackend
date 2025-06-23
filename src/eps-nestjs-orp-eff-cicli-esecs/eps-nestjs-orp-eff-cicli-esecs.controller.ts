import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../roles/roles.enum';
import { User as UserType } from '../users/domain/user';
import { UserEntity } from '../users/infrastructure/persistence/relational/entities/user.entity';
import { UsersService } from '../users/users.service';
import { User } from '../utils/decorators';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPaginationQueryBuilder } from '../utils/infinity-pagination';
import { TempoOperatoreToSessantesimiTransformer } from '../utils/transformers/tempo-in-human-readable';
import { EpsNestjsOrpEffCicliEsec } from './domain/eps-nestjs-orp-eff-cicli-esec';
import { CreateEpsNestjsOrpEffCicliEsecDto } from './dto/create-eps-nestjs-orp-eff-cicli-esec.dto';
import { FindAllEpsNestjsOrpEffCicliEsecsDto } from './dto/find-all-esp-nestjs-orp-eff-cicli-esecs.dto';
import { UpdateEpsNestjsOrpEffCicliEsecDto } from './dto/update-esp-nestjs-orp-eff-cicli-esec.dto';
import { EpsNestjsOrpEffCicliEsecsService } from './eps-nestjs-orp-eff-cicli-esecs.service';

const transformer = new TempoOperatoreToSessantesimiTransformer();

@ApiTags('Epsnestjsorpeffcicliesecs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'eps-nestjs-orp-eff-cicli-esecs',
  version: '1',
})
export class EpsNestjsOrpEffCicliEsecsController {
  constructor(
    private readonly epsNestjsOrpEffCicliEsecsService: EpsNestjsOrpEffCicliEsecsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: EpsNestjsOrpEffCicliEsec,
  })
  async create(
    @Body()
    createEpsNestjsOrpEffCicliEsecDto: CreateEpsNestjsOrpEffCicliEsecDto,
    @User() user: UserType,
  ) {
    // 1. HO I RUOLI PER FARLO
    // 2. HO IL COD_OP DEFINITO in TABELLA EPS_NESTJS_USERS
    // 3.

    let currentUser = await this.userService.findById(user.id);

    if (currentUser?.role != null && (currentUser?.role.id === RoleEnum.autista || currentUser?.role.id === RoleEnum.user)) {
      if (currentUser.COD_OP != null && currentUser.COD_OP != createEpsNestjsOrpEffCicliEsecDto.COD_OP) {
        // sono me stesso - tra quello autenticato e quello inicato nei parametri?
        throw new HttpException(
          {
            errors: {
              message: 'Operazione non è consentita con questo ruolo utente',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    currentUser = await this.userService.findByCodOp(createEpsNestjsOrpEffCicliEsecDto.COD_OP); // seleziono quello corrente (se ho i ruoli) - oppure quello passato come parametro

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

    if (currentUser?.role && (currentUser.role.id == RoleEnum.badge || currentUser.role.id == RoleEnum.admin)) {
      // l'inserimento dovrà essere per qualcun'altro
      currentUser = await this.userService.findByCodOp(createEpsNestjsOrpEffCicliEsecDto.COD_OP);
    }

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

    if (currentUser.role != null && (currentUser?.role.id === RoleEnum.autista || currentUser?.role.id === RoleEnum.user)) {
      if (currentUser.COD_OP != createEpsNestjsOrpEffCicliEsecDto.COD_OP) {
        throw new HttpException(
          {
            errors: {
              message: 'Operazione non è consentita con questo ruolo utente',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    const { data: epsNestjsOrpEffCicliEsecs } = await this.epsNestjsOrpEffCicliEsecsService.findAllWithPagination({
      filterOptions: [
        { columnName: 'COD_OP', value: createEpsNestjsOrpEffCicliEsecDto.COD_OP },
        { columnName: 'DATA_INIZIO', value: createEpsNestjsOrpEffCicliEsecDto.DATA_INIZIO?.toISOString() || '' },
        { columnName: 'DATA_FINE', value: createEpsNestjsOrpEffCicliEsecDto.DATA_FINE?.toISOString() || '' }, //FINE E INIZIO PER ORA COINCIDONO...
      ],
      sortOptions: [],
    });

    const totaleTempoOperatore = createEpsNestjsOrpEffCicliEsecDto.TEMPO_OPERATORE?.add(epsNestjsOrpEffCicliEsecs.totaleTempoOperatore);

    if (totaleTempoOperatore && totaleTempoOperatore.toNumber() > 20) {
      // throw new Error('Il tempo totale operatore non può superare 20:00');
      throw new HttpException(
        {
          errors: {
            message: 'Il tempo totale non può superare 20 ore nella giornata lavorativa',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.epsNestjsOrpEffCicliEsecsService.create(createEpsNestjsOrpEffCicliEsecDto, user);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(EpsNestjsOrpEffCicliEsec),
  })
  async findAll(
    @Query() query: FindAllEpsNestjsOrpEffCicliEsecsDto,

    @User() user: UserType,
  ): Promise<
    InfinityPaginationResponseDto<EpsNestjsOrpEffCicliEsec> & {
      totale: string;
      targetDateInizio: string;
      dateInizio: Date;
    }
  > {
    // 1. HO I RUOLI PER FARLO
    // 2. HO IL COD_OP DEFINITO in TABELLA EPS_NESTJS_USERS
    // 3.

    const filters = query.filters;
    const sort = query.sort;

    const COD_OP = filters?.find((it) => it.columnName == 'COD_OP')?.value;
    const curreUser = await this.userService.findById(user.id);

    if (curreUser != null && curreUser.COD_OP != COD_OP) {
      if (user.role && (user.role.id == RoleEnum.user || user.role.id == RoleEnum.autista)) {
        throw new HttpException(
          {
            errors: {
              message: 'Operazione non consentita',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    const userByCodOp = await this.userService.findByCodOp(COD_OP);

    if (!userByCodOp) {
      throw new HttpException(
        {
          errors: {
            message: 'Utente non trovato',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { data: epsNestjsOrpEffCicliEsecs } = await this.epsNestjsOrpEffCicliEsecsService.findAllWithPagination({
      filterOptions: filters,
      sortOptions: sort,
    });

    const paginationResult = infinityPaginationQueryBuilder(epsNestjsOrpEffCicliEsecs.list, 1);

    return {
      ...paginationResult,
      totale: transformer.convertiOreInFormatoHHMM(epsNestjsOrpEffCicliEsecs.totaleTempoOperatore),
      targetDateInizio: transformer.convertiInGiorno(epsNestjsOrpEffCicliEsecs.targetDateInizio),
      dateInizio: epsNestjsOrpEffCicliEsecs.targetDateInizio,
    };
  }

  @Get('operatore')
  @ApiOkResponse({
    type: InfinityPaginationResponse(EpsNestjsOrpEffCicliEsec),
  })
  async findAllOperatori(@Query() query: FindAllEpsNestjsOrpEffCicliEsecsDto): Promise<
    InfinityPaginationResponseDto<EpsNestjsOrpEffCicliEsec> & {
      totale: string;
      targetDateInizio: string;
      dateInizio: Date;
    }
  > {
    const filters = query.filters;
    const sort = query.sort;

    const COD_OP = filters?.find((it) => it.columnName == 'COD_OP')?.value;

    const user = await this.userService.findByCodOp(COD_OP);

    if (!user) {
      throw new HttpException(
        {
          errors: {
            message: 'Utente non trovato',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { data: epsNestjsOrpEffCicliEsecs } = await this.epsNestjsOrpEffCicliEsecsService.findAllWithPagination({
      filterOptions: filters,
      sortOptions: sort,
    });

    const count = epsNestjsOrpEffCicliEsecs.list.length;

    const paginationResult = infinityPaginationQueryBuilder(epsNestjsOrpEffCicliEsecs.list, count);

    return {
      ...paginationResult,
      totale: transformer.convertiOreInFormatoHHMM(epsNestjsOrpEffCicliEsecs.totaleTempoOperatore),
      targetDateInizio: transformer.convertiInGiorno(epsNestjsOrpEffCicliEsecs.targetDateInizio),
      dateInizio: epsNestjsOrpEffCicliEsecs.targetDateInizio,
    };
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: EpsNestjsOrpEffCicliEsec,
  })
  update(
    @Param('id') id: string,
    @Body()
    updateEspNestjsOrpEffCicliEsecDto: UpdateEpsNestjsOrpEffCicliEsecDto,
  ) {
    return this.epsNestjsOrpEffCicliEsecsService.update(id, updateEspNestjsOrpEffCicliEsecDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @User() user: UserEntity) {
    return this.epsNestjsOrpEffCicliEsecsService.remove(id, user);
  }
}
