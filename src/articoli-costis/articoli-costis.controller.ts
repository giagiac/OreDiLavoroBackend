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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArticoliCostisService } from './articoli-costis.service';
import { CreateArticoliCostiDto } from './dto/create-articoli-costi.dto';
import { UpdateArticoliCostiDto } from './dto/update-articoli-costi.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ArticoliCosti } from './domain/articoli-costi';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllArticoliCostisDto } from './dto/find-all-articoli-costis.dto';

@ApiTags('Articolicostis')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'articoli-costis',
  version: '1',
})
export class ArticoliCostisController {
  constructor(private readonly articoliCostisService: ArticoliCostisService) {}

  // @Post()
  // @ApiCreatedResponse({
  //   type: ArticoliCosti,
  // })
  // create(@Body() createArticoliCostiDto: CreateArticoliCostiDto) {
  //   return this.articoliCostisService.create(createArticoliCostiDto);
  // }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ArticoliCosti),
  })
  async findAll(
    @Query() query: FindAllArticoliCostisDto,
  ): Promise<InfinityPaginationResponseDto<ArticoliCosti>> {
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

  // @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: ArticoliCosti,
  // })
  // findById(@Param('id') id: string) {
  //   return this.articoliCostisService.findById(id);
  // }

  @Patch(':CF_COMM_ID')
  @ApiParam({
    name: 'CF_COMM_ID',
    type: String,
    required: true,
  })
  @ApiCreatedResponse({
    type: ArticoliCosti,
  })
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('CF_COMM_ID') CF_COMM_ID: string,
    @Body() updateArticoliCostiDto: UpdateArticoliCostiDto,
  ) {
    return this.articoliCostisService.update(CF_COMM_ID, updateArticoliCostiDto);
  }

  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // remove(@Param('id') id: string) {
  //   return this.articoliCostisService.remove(id);
  // }
}
