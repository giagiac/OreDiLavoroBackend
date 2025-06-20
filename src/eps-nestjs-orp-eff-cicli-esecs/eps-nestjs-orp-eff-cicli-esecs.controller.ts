import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
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
    createEspNestjsOrpEffCicliEsecDto: CreateEpsNestjsOrpEffCicliEsecDto,
    @User() user: UserType,
  ) {
    const { data: epsNestjsOrpEffCicliEsecs } = await this.epsNestjsOrpEffCicliEsecsService.findAllWithPagination({
      filterOptions: [{ columnName: 'COD_OP', value: createEspNestjsOrpEffCicliEsecDto.COD_OP }],
      sortOptions: [],
    });

    const totaleTempoOperatore = createEspNestjsOrpEffCicliEsecDto.TEMPO_OPERATORE?.add(epsNestjsOrpEffCicliEsecs.totaleTempoOperatore);

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

    return this.epsNestjsOrpEffCicliEsecsService.create(createEspNestjsOrpEffCicliEsecDto, user);
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
    }
  > {
    const filters = query.filters;
    const sort = query.sort;

    const COD_OP = filters?.find((it) => it.columnName == 'COD_OP')?.value;

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
    };
  }

  // @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: EpsNestjsOrpEffCicliEsec,
  // })
  // findById(@Param('id') id: string, @User() user: UserEntity) {
  //   return this.epsNestjsOrpEffCicliEsecsService.findById(id, user);
  // }

  @Get('operatore')
  @ApiOkResponse({
    type: InfinityPaginationResponse(EpsNestjsOrpEffCicliEsec),
  })
  async findAllOperatori(@Query() query: FindAllEpsNestjsOrpEffCicliEsecsDto): Promise<
    InfinityPaginationResponseDto<EpsNestjsOrpEffCicliEsec> & {
      totale: string;
      targetDateInizio: string;
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
