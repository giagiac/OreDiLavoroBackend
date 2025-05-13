import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { artCostisService } from './art-costi.service';
import { ArtCosti } from './domain/art-costi';
import { FindAllartCostiDto } from './dto/find-all-art-costi.dto';
import { UpdateartCostiDto } from './dto/update-art-costi.dto';

@ApiTags('Artcostis')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'art-costi',
  version: '1',
})
export class artCostisController {
  constructor(private readonly artCostisService: artCostisService) {}

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ArtCosti),
  })
  async findAll(@Query() query: FindAllartCostiDto): Promise<InfinityPaginationResponseDto<ArtCosti>> {
    const COD_ART = query.COD_ART;
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.artCostisService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        COD_ART,
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ArtCosti,
  })
  findById(@Param('id') id: string) {
    return this.artCostisService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ArtCosti,
  })
  update(@Param('id') id: string, @Body() updateartCostiDto: UpdateartCostiDto) {
    return this.artCostisService.update(id, updateartCostiDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.artCostisService.remove(id);
  }
}
