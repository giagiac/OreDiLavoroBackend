import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../users/infrastructure/persistence/relational/entities/user.entity';
import { User } from '../utils/decorators';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPaginationQueryBuilder } from '../utils/infinity-pagination';
import { TempoOperatoreToSessantesimiTransformer } from '../utils/transformers/tempo-in-human-readable';
import { EpsNestjsOrpEffCicliEsecChild } from './domain/eps-nestjs-orp-eff-cicli-esec-child';
import { CreateEpsNestjsOrpEffCicliEsecChildDto } from './dto/create-eps-nestjs-orp-eff-cicli-esec-child.dto';
import { FindAllEpsNestjsOrpEffCicliEsecChildrenDto } from './dto/find-all-eps-nestjs-orp-eff-cicli-esec-children.dto';
import { UpdateEpsNestjsOrpEffCicliEsecChildDto } from './dto/update-eps-nestjs-orp-eff-cicli-esec-child.dto';
import { EpsNestjsOrpEffCicliEsecChildrenService } from './eps-nestjs-orp-eff-cicli-esec-children.service';

@ApiTags('Epsnestjsorpeffcicliesecchildren')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'eps-nestjs-orp-eff-cicli-esec-children',
  version: '1',
})
export class EpsNestjsOrpEffCicliEsecChildrenController {
  constructor(private readonly epsNestjsOrpEffCicliEsecChildrenService: EpsNestjsOrpEffCicliEsecChildrenService) {}

  @Post()
  @ApiCreatedResponse({
    type: EpsNestjsOrpEffCicliEsecChild,
  })
  async create(
    @Body()
    createEspNestjsOrpEffCicliEsecChildDto: CreateEpsNestjsOrpEffCicliEsecChildDto,
    @User() user: UserEntity,
  ) {
    const { data: epsNestjsOrpEffCicliEsecChilds, count } = await this.epsNestjsOrpEffCicliEsecChildrenService.findAllWithPagination({
      paginationOptions: {
        page: 1,
        limit: 1,
      },
      filterOptions: [],
      sortOptions: [],
      user,
    });

    // numero appena inserito da aggiungere al resto precedentemente salvato...
    const totaleTempoOperatore = createEspNestjsOrpEffCicliEsecChildDto.TEMPO_OPERATORE?.add(
      epsNestjsOrpEffCicliEsecChilds.totaleTempoOperatore,
    );

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

    return this.epsNestjsOrpEffCicliEsecChildrenService.create(createEspNestjsOrpEffCicliEsecChildDto, user);
  }

  transformer = new TempoOperatoreToSessantesimiTransformer();

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(EpsNestjsOrpEffCicliEsecChild),
  })
  async findAll(
    @Query() query: FindAllEpsNestjsOrpEffCicliEsecChildrenDto,
    @Req() req: Request,
    @User() user: UserEntity,
  ): Promise<
    InfinityPaginationResponseDto<EpsNestjsOrpEffCicliEsecChild> & {
      totale: string;
      targetDateInizio: string;
    }
  > {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 200) {
      limit = 200;
    }

    const filters = query.filters;
    const sort = query.sort;

    const { data: epsNestjsOrpEffCicliEsecs, count } = await this.epsNestjsOrpEffCicliEsecChildrenService.findAllWithPagination({
      paginationOptions: {
        page,
        limit,
      },
      filterOptions: filters,
      sortOptions: sort,
      user,
    });

    const paginationResult = infinityPaginationQueryBuilder(epsNestjsOrpEffCicliEsecs.list, count);

    return {
      ...paginationResult,
      totale: this.transformer.convertiOreInFormatoHHMM(epsNestjsOrpEffCicliEsecs.totaleTempoOperatore),
      targetDateInizio: this.transformer.convertiInGiorno(epsNestjsOrpEffCicliEsecs.targetDateInizio),
    };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: EpsNestjsOrpEffCicliEsecChild,
  })
  findById(@Param('id') id: string) {
    return this.epsNestjsOrpEffCicliEsecChildrenService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: EpsNestjsOrpEffCicliEsecChild,
  })
  update(@Param('id') id: string, @Body() updateEpsNestjsOrpEffCicliEsecChildDto: UpdateEpsNestjsOrpEffCicliEsecChildDto) {
    return this.epsNestjsOrpEffCicliEsecChildrenService.update(id, updateEpsNestjsOrpEffCicliEsecChildDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.epsNestjsOrpEffCicliEsecChildrenService.remove(id);
  }
}
