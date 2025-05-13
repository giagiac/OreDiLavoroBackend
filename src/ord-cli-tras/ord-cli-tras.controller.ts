import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { OrdCliTrasService } from './ord-cli-tras.service';
import { CreateOrdCliTrasDto } from './dto/create-ord-cli-tras.dto';
import { UpdateOrdCliTrasDto } from './dto/update-ord-cli-tras.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { OrdCliTras } from './domain/ord-cli-tras';
import { AuthGuard } from '@nestjs/passport';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllOrdCliTrasDto } from './dto/find-all-ord-cli-tras.dto';

@ApiTags('Ordclitras')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'ord-cli-tras',
  version: '1',
})
export class OrdCliTrasController {
  constructor(private readonly ordCliTrasService: OrdCliTrasService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrdCliTras,
  })
  create(@Body() createOrdCliTrasDto: CreateOrdCliTrasDto) {
    return this.ordCliTrasService.create(createOrdCliTrasDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrdCliTras),
  })
  async findAll(@Query() query: FindAllOrdCliTrasDto): Promise<InfinityPaginationResponseDto<OrdCliTras>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.ordCliTrasService.findAllWithPagination({
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
    type: OrdCliTras,
  })
  findById(@Param('DOC_ID') DOC_ID: string) {
    return this.ordCliTrasService.findById(DOC_ID);
  }

  @Patch(':DOC_ID')
  @ApiParam({
    name: 'DOC_ID',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrdCliTras,
  })
  update(@Param('DOC_ID') DOC_ID: string, @Body() updateOrdCliTrasDto: UpdateOrdCliTrasDto) {
    return this.ordCliTrasService.update(DOC_ID, updateOrdCliTrasDto);
  }

  @Delete(':DOC_ID')
  @ApiParam({
    name: 'DOC_ID',
    type: String,
    required: true,
  })
  remove(@Param('DOC_ID') DOC_ID: string) {
    return this.ordCliTrasService.remove(DOC_ID);
  }
}
