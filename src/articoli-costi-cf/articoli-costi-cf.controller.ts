import {
  Body,
  Controller,
  Delete,
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
import { ArticoliCostiCfService } from './articoli-costi-cf.service';
import { ArticoliCostiCf } from './domain/articoli-costi-cf';
import { FindAllArticoliCostiCfDto } from './dto/find-all-articoli-costi-cf.dto';
import { UpdateArticoliCostiCfDto } from './dto/update-articoli-costi-cf.dto';

@ApiTags('ArticoliCostiCf')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'articoli-costi-cf',
  version: '1',
})
export class ArticoliCostiCfController {
  constructor(
    private readonly articoliCostiCfService: ArticoliCostiCfService,
  ) {}

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ArticoliCostiCf),
  })
  async findAll(
    @Query() query: FindAllArticoliCostiCfDto,
  ): Promise<InfinityPaginationResponseDto<ArticoliCostiCf>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.articoliCostiCfService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Patch()
  @ApiCreatedResponse({
    type: ArticoliCostiCf,
  })
  @HttpCode(HttpStatus.CREATED)
  update(@Body() updateArticoliCostiCfDto: UpdateArticoliCostiCfDto) {
    return this.articoliCostiCfService.update(updateArticoliCostiCfDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.articoliCostiCfService.remove(id);
  }
}
