import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OperatorisService } from './operatoris.service';
import { CreateOperatoriDto } from './dto/create-operatori.dto';
import { UpdateOperatoriDto } from './dto/update-operatori.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Operatori } from './domain/operatori';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import {
  infinityPagination,
  infinityPaginationQueryBuilder,
} from '../utils/infinity-pagination';
import { FindAllOperatorisDto } from './dto/find-all-operatoris.dto';

@ApiTags('Operatoris')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'operatoris',
  version: '1',
})
export class OperatorisController {
  constructor(private readonly operatorisService: OperatorisService) {}

  @Post()
  @ApiCreatedResponse({
    type: Operatori,
  })
  create(@Body() createOperatoriDto: CreateOperatoriDto) {
    return this.operatorisService.create(createOperatoriDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Operatori),
  })
  async findAll(
    @Query() query: FindAllOperatorisDto,
  ): Promise<InfinityPaginationResponseDto<Operatori>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const filters = query.filters;
    const sort = query.sort;
    const join =
      query.othersFilters != null &&
      query.othersFilters.findIndex(
        (it) => it.key == 'join' && it.value == 'true',
      ) > -1;

    const { operatori, count } =
      await this.operatorisService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        filterOptions: filters,
        sortOptions: sort,
        join,
      });

    return infinityPaginationQueryBuilder(operatori, count);
  }

  @Get('operatori-esecuzioni')
  @ApiOkResponse({
    type: InfinityPaginationResponse(Operatori),
  })
  async findAllEsecuzioni(
    @Query() query: FindAllOperatorisDto,
  ): Promise<InfinityPaginationResponseDto<Operatori>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const filters = query.filters;
    const sort = query.sort;
    const join =
      query.othersFilters != null &&
      query.othersFilters.findIndex(
        (it) => it.key == 'join' && it.value == 'true',
      ) > -1;

    const { operatori, count } =
      await this.operatorisService.findAllEsecuzioniWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        filterOptions: filters,
        sortOptions: sort,
        join,
      });

    return infinityPaginationQueryBuilder(operatori, count);
  }

  @Get(':COD_OP')
  @ApiParam({
    name: 'COD_OP',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Operatori,
  })
  findById(@Param('COD_OP') COD_OP: string) {
    return this.operatorisService.findById(COD_OP);
  }

  @Patch(':COD_OP')
  @ApiParam({
    name: 'COD_OP',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Operatori,
  })
  update(
    @Param('COD_OP') COD_OP: string,
    @Body() updateOperatoriDto: UpdateOperatoriDto,
  ) {
    return this.operatorisService.update(COD_OP, updateOperatoriDto);
  }

  @Delete(':COD_OP')
  @ApiParam({
    name: 'COD_OP',
    type: String,
    required: true,
  })
  remove(@Param('COD_OP') COD_OP: string) {
    return this.operatorisService.remove(COD_OP);
  }
}
