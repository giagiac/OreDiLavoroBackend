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
import { tipiCostiArt } from './domain/tipi-costi-art';
import { FindAlltipiCostiArtDto } from './dto/find-all-tipi-costi-art.dto';
import { UpdatetipiCostiArtDto } from './dto/update-tipi-costi-art.dto';
import { tipiCostiArtsService } from './tipi-costi-art.service';

@ApiTags('Tipicostiarts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'tipi-costi-arts',
  version: '1',
})
export class tipiCostiArtsController {
  constructor(private readonly tipiCostiArtsService: tipiCostiArtsService) {}

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(tipiCostiArt),
  })
  async findAll(
    @Query() query: FindAlltipiCostiArtDto,
  ): Promise<InfinityPaginationResponseDto<tipiCostiArt>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.tipiCostiArtsService.findAllWithPagination({
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
    type: tipiCostiArt,
  })
  findById(@Param('id') id: string) {
    return this.tipiCostiArtsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: tipiCostiArt,
  })
  update(
    @Param('id') id: string,
    @Body() updatetipiCostiArtDto: UpdatetipiCostiArtDto,
  ) {
    return this.tipiCostiArtsService.update(id, updatetipiCostiArtDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.tipiCostiArtsService.remove(id);
  }
}
