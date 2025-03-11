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
import { infinityPagination } from '../utils/infinity-pagination';
import { art_anaService } from './art-ana.service';
import { art_ana } from './domain/art-ana';
import { FindAllart_anaDto } from './dto/find-all-art-ana.dto';
import { Updateart_anaDto } from './dto/update-art-ana.dto';

@ApiTags('ArtAna')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'art-ana',
  version: '1',
})
export class art_anaController {
  constructor(private readonly artAnaService: art_anaService) {}

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(art_ana),
  })
  async findAll(
    @Query() query: FindAllart_anaDto,
  ): Promise<InfinityPaginationResponseDto<art_ana>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.artAnaService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
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
    type: art_ana,
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
    type: art_ana,
  })
  update(@Param('id') id: string, @Body() updateart_anaDto: Updateart_anaDto) {
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
