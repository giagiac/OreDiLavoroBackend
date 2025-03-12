import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPaginationQueryBuilder } from '../utils/infinity-pagination';
import { ArtAnaService } from './art-ana.service';
import { ArtAna } from './domain/art-ana';
import { FindAllArtAnaDto } from './dto/find-all-art-ana.dto';
import { UpdateArtAnanaDto } from './dto/update-art-ana.dto';

@ApiTags('ArtAna')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'art-ana',
  version: '1',
})
export class art_anaController {
  constructor(private readonly artAnaService: ArtAnaService) {}

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ArtAna),
  })
  async findAll(
    @Query() query: FindAllArtAnaDto,
  ): Promise<InfinityPaginationResponseDto<ArtAna>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 200) {
      limit = 200;
    }

    const filters = query.filters;
    const sort = query.sort;

    const { data: cf, count } = await this.artAnaService.findAllWithPagination({
      paginationOptions: {
        page,
        limit,
      },
      filterOptions: filters,
      sortOptions: sort,
    });

    return infinityPaginationQueryBuilder(cf, count);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ArtAna,
  })
  findById(@Param('id') id: string) {
    return this.artAnaService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ArtAna,
  })
  update(@Param('id') id: string, @Body() updateart_anaDto: UpdateArtAnanaDto) {
    return this.artAnaService.update(id, updateart_anaDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.artAnaService.remove(id);
  }
}
