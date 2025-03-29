import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import {
  infinityPagination,
  infinityPaginationQueryBuilder,
} from '../utils/infinity-pagination';
import { EpsNestjsOrpEffCicliEsec } from './domain/eps-nestjs-orp-eff-cicli-esec';
import { CreateEpsNestjsOrpEffCicliEsecDto } from './dto/create-eps-nestjs-orp-eff-cicli-esec.dto';
import { FindAllEpsNestjsOrpEffCicliEsecsDto } from './dto/find-all-esp-nestjs-orp-eff-cicli-esecs.dto';
import { UpdateEpsNestjsOrpEffCicliEsecDto } from './dto/update-esp-nestjs-orp-eff-cicli-esec.dto';
import { EpsNestjsOrpEffCicliEsecsService } from './eps-nestjs-orp-eff-cicli-esecs.service';
import { UserEntity } from '../users/infrastructure/persistence/relational/entities/user.entity';
import { User } from '../utils/decorators';
import Decimal from 'decimal.js';

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
  ) { }

  @Post()
  @ApiCreatedResponse({
    type: EpsNestjsOrpEffCicliEsec,
  })
  create(
    @Body()
    createEspNestjsOrpEffCicliEsecDto: CreateEpsNestjsOrpEffCicliEsecDto,
  ) {
    return this.epsNestjsOrpEffCicliEsecsService.create(
      createEspNestjsOrpEffCicliEsecDto,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(EpsNestjsOrpEffCicliEsec),
  })
  async findAll(
    @Query() query: FindAllEpsNestjsOrpEffCicliEsecsDto,
    @Req() req: Request,
    @User() user: UserEntity,
  ): Promise<InfinityPaginationResponseDto<EpsNestjsOrpEffCicliEsec> & { totale: Number }> {
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

    const paginationResult = infinityPaginationQueryBuilder(epsNestjsOrpEffCicliEsecs.list, count)

    return {
      totale: epsNestjsOrpEffCicliEsecs.totaleTempoOperatore,
      ...paginationResult
    }
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
  remove(@Param('id') id: string) {
    return this.epsNestjsOrpEffCicliEsecsService.remove(id);
  }
}
