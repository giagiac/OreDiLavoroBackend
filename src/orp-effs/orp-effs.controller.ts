import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { OrpEffsService } from './orp-effs.service';
import { CreateOrpEffDto } from './dto/create-orp-eff.dto';
import { UpdateOrpEffDto } from './dto/update-orp-eff.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { OrpEff } from './domain/orp-eff';
import { AuthGuard } from '@nestjs/passport';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllOrpEffsDto } from './dto/find-all-orp-effs.dto';

@ApiTags('Orpeffs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'orp-effs',
  version: '1',
})
export class OrpEffsController {
  constructor(private readonly orpEffsService: OrpEffsService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrpEff,
  })
  create(@Body() createOrpEffDto: CreateOrpEffDto) {
    return this.orpEffsService.create(createOrpEffDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrpEff),
  })
  async findAll(@Query() query: FindAllOrpEffsDto): Promise<InfinityPaginationResponseDto<OrpEff>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.orpEffsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':DOC_ID')
  @ApiParam({
    name: 'DOC_ID',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrpEff,
  })
  findById(@Param('DOC_ID') DOC_ID: string) {
    return this.orpEffsService.findById(DOC_ID);
  }

  @Patch(':DOC_ID')
  @ApiParam({
    name: 'DOC_ID',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrpEff,
  })
  update(@Param('DOC_ID') DOC_ID: string, @Body() updateOrpEffDto: UpdateOrpEffDto) {
    return this.orpEffsService.update(DOC_ID, updateOrpEffDto);
  }

  @Delete(':DOC_ID')
  @ApiParam({
    name: 'DOC_ID',
    type: String,
    required: true,
  })
  remove(@Param('DOC_ID') DOC_ID: string) {
    return this.orpEffsService.remove(DOC_ID);
  }
}
