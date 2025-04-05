import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from '../users/infrastructure/persistence/relational/entities/user.entity';
import { User } from '../utils/decorators';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPaginationQueryBuilder } from '../utils/infinity-pagination';
import { TempoOperatoreToSessantesimiTransformer } from '../utils/transformers/tempo-in-human-readable';
import { EpsNestjsOrpEffCicliEsec } from './domain/eps-nestjs-orp-eff-cicli-esec';
import { CreateEpsNestjsOrpEffCicliEsecDto } from './dto/create-eps-nestjs-orp-eff-cicli-esec.dto';
import { FindAllEpsNestjsOrpEffCicliEsecsDto } from './dto/find-all-esp-nestjs-orp-eff-cicli-esecs.dto';
import { UpdateEpsNestjsOrpEffCicliEsecDto } from './dto/update-esp-nestjs-orp-eff-cicli-esec.dto';
import { EpsNestjsOrpEffCicliEsecsService } from './eps-nestjs-orp-eff-cicli-esecs.service';
import { th } from 'date-fns/locale';

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
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: EpsNestjsOrpEffCicliEsec,
  })
  async create(
    @Body()
    createEspNestjsOrpEffCicliEsecDto: CreateEpsNestjsOrpEffCicliEsecDto,
    @User() user: UserEntity,
  ) {
    const { data: epsNestjsOrpEffCicliEsecs, count } =
      await this.epsNestjsOrpEffCicliEsecsService.findAllWithPagination({
        paginationOptions: {
          page: 1,
          limit: 1,
        },
        filterOptions: [],
        sortOptions: [],
        user,
      });

    const totaleTempoOperatore =
      createEspNestjsOrpEffCicliEsecDto.TEMPO_OPERATORE?.add(
        epsNestjsOrpEffCicliEsecs.totaleTempoOperatore,
      );

    if (totaleTempoOperatore && totaleTempoOperatore.toNumber() > 20) {
      // throw new Error('Il tempo totale operatore non può superare 20:00');
      throw new HttpException(
        {
          errors: {
            message:
              'Il tempo totale non può superare 20 ore nella giornata lavorativa',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.epsNestjsOrpEffCicliEsecsService.create(
      createEspNestjsOrpEffCicliEsecDto,
      user,
    );
  }

  transformer = new TempoOperatoreToSessantesimiTransformer();

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(EpsNestjsOrpEffCicliEsec),
  })
  async findAll(
    @Query() query: FindAllEpsNestjsOrpEffCicliEsecsDto,
    @Req() req: Request,
    @User() user: UserEntity,
  ): Promise<
    InfinityPaginationResponseDto<EpsNestjsOrpEffCicliEsec> & {
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

    const { data: epsNestjsOrpEffCicliEsecs, count } =
      await this.epsNestjsOrpEffCicliEsecsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        filterOptions: filters,
        sortOptions: sort,
        user,
      });

    const paginationResult = infinityPaginationQueryBuilder(
      epsNestjsOrpEffCicliEsecs.list,
      count,
    );

    return {
      ...paginationResult,
      totale: this.transformer.convertiOreInFormatoHHMM(
        epsNestjsOrpEffCicliEsecs.totaleTempoOperatore,
      ),
      targetDateInizio: this.transformer.convertiInGiorno(
        epsNestjsOrpEffCicliEsecs.targetDateInizio,
      ),
    };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: EpsNestjsOrpEffCicliEsec,
  })
  findById(@Param('id') id: string) {
    return this.epsNestjsOrpEffCicliEsecsService.findById(id);
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
    return this.epsNestjsOrpEffCicliEsecsService.update(
      id,
      updateEspNestjsOrpEffCicliEsecDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.epsNestjsOrpEffCicliEsecsService.remove(id);
  }
}
