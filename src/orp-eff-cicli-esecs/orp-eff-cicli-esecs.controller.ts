import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPaginationQueryBuilder } from '../utils/infinity-pagination';
import { OrpEffCicliEsec } from './domain/orp-eff-cicli-esec';
import { CreateOrpEffCicliEsecDto } from './dto/create-orp-eff-cicli-esec.dto';
import { FindAllOrpEffCicliEsecsDto } from './dto/find-all-orp-eff-cicli-esecs.dto';
import { UpdateOrpEffCicliEsecDto } from './dto/update-orp-eff-cicli-esec.dto';
import { OrpEffCicliEsecsService } from './orp-eff-cicli-esecs.service';

@ApiTags('Orpeffcicliesecs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'orp-eff-cicli-esecs',
  version: '1',
})
export class OrpEffCicliEsecsController {
  constructor(private readonly orpEffCicliEsecsService: OrpEffCicliEsecsService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrpEffCicliEsec,
  })
  create(@Body() createOrpEffCicliEsecDto: CreateOrpEffCicliEsecDto) {
    return this.orpEffCicliEsecsService.create(createOrpEffCicliEsecDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrpEffCicliEsec),
  })
  async findAll(@Query() query: FindAllOrpEffCicliEsecsDto): Promise<InfinityPaginationResponseDto<OrpEffCicliEsec>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const filters = query.filters;
    const sort = query.sort;
    const join = query.othersFilters != null && query.othersFilters.findIndex((it) => it.key == 'join' && it.value == 'true') > -1;

    const { orpEffCicliEsec, count } = await this.orpEffCicliEsecsService.findAllWithPagination({
      paginationOptions: {
        page,
        limit,
      },
      filterOptions: filters,
      sortOptions: sort,
      join,
    });

    return infinityPaginationQueryBuilder(orpEffCicliEsec, count);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrpEffCicliEsec,
  })
  findById(@Param('id') id: string) {
    return this.orpEffCicliEsecsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrpEffCicliEsec,
  })
  update(@Param('id') id: string, @Body() updateOrpEffCicliEsecDto: UpdateOrpEffCicliEsecDto) {
    return this.orpEffCicliEsecsService.update(id, updateOrpEffCicliEsecDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.orpEffCicliEsecsService.remove(id);
  }
}
