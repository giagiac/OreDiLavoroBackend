import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
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
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { ArticoliCostiCfCommService } from './articoli-costi-cf-comm.service';
import { ArticoliCostiCfComm } from './domain/articoli-costi-cf-comm';
import { FindAllArticoliCostiCfCommDto } from './dto/find-all-articoli-costi-cf-comm.dto';
import { UpdateArticoliCostiCfCommDto } from './dto/update-articoli-costi-cf-comm.dto';

@ApiTags('ArticoliCostiCfComm')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'articoli-costi-cf-comm',
  version: '1',
})
export class ArticoliCostiCfCommController {
  constructor(
    private readonly articoliCostisService: ArticoliCostiCfCommService,
  ) {}

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ArticoliCostiCfComm),
  })
  async findAll(
    @Query() query: FindAllArticoliCostiCfCommDto,
  ): Promise<InfinityPaginationResponseDto<ArticoliCostiCfComm>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.articoliCostisService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Patch(':CF_COMM_ID')
  @ApiParam({
    name: 'CF_COMM_ID',
    type: String,
    required: true,
  })
  @ApiCreatedResponse({
    type: ArticoliCostiCfComm,
  })
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('CF_COMM_ID') CF_COMM_ID: string,
    @Body() updateArticoliCostiDto: UpdateArticoliCostiCfCommDto,
  ) {
    return this.articoliCostisService.update(
      CF_COMM_ID,
      updateArticoliCostiDto,
    );
  }
}
