import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { LinkOrpOrdsService } from './link-orp-ords.service';
import { CreateLinkOrpOrdDto } from './dto/create-link-orp-ord.dto';
import { UpdateLinkOrpOrdDto } from './dto/update-link-orp-ord.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { LinkOrpOrd } from './domain/link-orp-ord';
import { AuthGuard } from '@nestjs/passport';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllLinkOrpOrdsDto } from './dto/find-all-link-orp-ords.dto';

@ApiTags('Linkorpords')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'link-orp-ords',
  version: '1',
})
export class LinkOrpOrdsController {
  constructor(private readonly linkOrpOrdsService: LinkOrpOrdsService) {}

  @Post()
  @ApiCreatedResponse({
    type: LinkOrpOrd,
  })
  create(@Body() createLinkOrpOrdDto: CreateLinkOrpOrdDto) {
    return this.linkOrpOrdsService.create(createLinkOrpOrdDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(LinkOrpOrd),
  })
  async findAll(@Query() query: FindAllLinkOrpOrdsDto): Promise<InfinityPaginationResponseDto<LinkOrpOrd>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.linkOrpOrdsService.findAllWithPagination({
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
    type: LinkOrpOrd,
  })
  findById(@Param('id') id: string) {
    return this.linkOrpOrdsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: LinkOrpOrd,
  })
  update(@Param('id') id: string, @Body() updateLinkOrpOrdDto: UpdateLinkOrpOrdDto) {
    return this.linkOrpOrdsService.update(id, updateLinkOrpOrdDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.linkOrpOrdsService.remove(id);
  }
}
