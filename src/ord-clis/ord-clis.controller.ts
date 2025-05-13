import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { OrdClisService } from './ord-clis.service';
import { CreateOrdCliDto } from './dto/create-ord-cli.dto';
import { UpdateOrdCliDto } from './dto/update-ord-cli.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { OrdCli } from './domain/ord-cli';
import { AuthGuard } from '@nestjs/passport';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllOrdClisDto } from './dto/find-all-ord-clis.dto';

@ApiTags('Ordclis')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'ord-clis',
  version: '1',
})
export class OrdClisController {
  constructor(private readonly ordClisService: OrdClisService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrdCli,
  })
  create(@Body() createOrdCliDto: CreateOrdCliDto) {
    return this.ordClisService.create(createOrdCliDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrdCli),
  })
  async findAll(@Query() query: FindAllOrdClisDto): Promise<InfinityPaginationResponseDto<OrdCli>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.ordClisService.findAllWithPagination({
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
    type: OrdCli,
  })
  findById(@Param('DOC_ID') DOC_ID: string) {
    return this.ordClisService.findById(DOC_ID);
  }

  @Patch(':DOC_ID')
  @ApiParam({
    name: 'DOC_ID',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrdCli,
  })
  update(@Param('DOC_ID') DOC_ID: string, @Body() updateOrdCliDto: UpdateOrdCliDto) {
    return this.ordClisService.update(DOC_ID, updateOrdCliDto);
  }

  @Delete(':DOC_ID')
  @ApiParam({
    name: 'DOC_ID',
    type: String,
    required: true,
  })
  remove(@Param('DOC_ID') DOC_ID: string) {
    return this.ordClisService.remove(DOC_ID);
  }
}
