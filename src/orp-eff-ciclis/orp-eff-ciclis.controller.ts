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
import { OrpEffCiclisService } from './orp-eff-ciclis.service';
import { CreateOrpEffCicliDto } from './dto/create-orp-eff-cicli.dto';
import { UpdateOrpEffCicliDto } from './dto/update-orp-eff-cicli.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrpEffCicli } from './domain/orp-eff-cicli';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import {
  infinityPagination,
  infinityPaginationQueryBuilder,
} from '../utils/infinity-pagination';
import { FindAllOrpEffCiclisDto } from './dto/find-all-orp-eff-ciclis.dto';

@ApiTags('Orpeffciclis')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'orp-eff-ciclis',
  version: '1',
})
export class OrpEffCiclisController {
  constructor(private readonly orpEffCiclisService: OrpEffCiclisService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrpEffCicli,
  })
  create(@Body() createOrpEffCicliDto: CreateOrpEffCicliDto) {
    return this.orpEffCiclisService.create(createOrpEffCicliDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrpEffCicli),
  })
  async findAll(
    @Query() query: FindAllOrpEffCiclisDto,
  ): Promise<InfinityPaginationResponseDto<OrpEffCicli>> {
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

    const { orpEffCicli, count } =
      await this.orpEffCiclisService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        filterOptions: filters,
        sortOptions: sort,
        join,
      });

    return infinityPaginationQueryBuilder(orpEffCicli, count);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrpEffCicli,
  })
  findById(@Param('id') id: string) {
    return this.orpEffCiclisService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrpEffCicli,
  })
  update(
    @Param('id') id: string,
    @Body() updateOrpEffCicliDto: UpdateOrpEffCicliDto,
  ) {
    return this.orpEffCiclisService.update(id, updateOrpEffCicliDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.orpEffCiclisService.remove(id);
  }
}
