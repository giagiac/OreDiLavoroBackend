import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { X1TrasCodicisService } from './x1-tras-codicis.service';
import { CreateX1TrasCodiciDto } from './dto/create-x1-tras-codici.dto';
import { UpdateX1TrasCodiciDto } from './dto/update-x1-tras-codici.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { X1TrasCodici } from './domain/x1-tras-codici';
import { AuthGuard } from '@nestjs/passport';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllX1TrasCodicisDto } from './dto/find-all-x1-tras-codicis.dto';

@ApiTags('X1trascodicis')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'x1-tras-codicis',
  version: '1',
})
export class X1TrasCodicisController {
  constructor(private readonly x1TrasCodicisService: X1TrasCodicisService) {}

  @Post()
  @ApiCreatedResponse({
    type: X1TrasCodici,
  })
  create(@Body() createX1TrasCodiciDto: CreateX1TrasCodiciDto) {
    return this.x1TrasCodicisService.create(createX1TrasCodiciDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(X1TrasCodici),
  })
  async findAll(@Query() query: FindAllX1TrasCodicisDto): Promise<InfinityPaginationResponseDto<X1TrasCodici>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.x1TrasCodicisService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':CODICE1')
  @ApiParam({
    name: 'CODICE1',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: X1TrasCodici,
  })
  findById(@Param('CODICE1') CODICE1: string) {
    return this.x1TrasCodicisService.findById(CODICE1);
  }

  @Patch(':CODICE1')
  @ApiParam({
    name: 'CODICE1',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: X1TrasCodici,
  })
  update(@Param('CODICE1') CODICE1: string, @Body() updateX1TrasCodiciDto: UpdateX1TrasCodiciDto) {
    return this.x1TrasCodicisService.update(CODICE1, updateX1TrasCodiciDto);
  }

  @Delete(':CODICE1')
  @ApiParam({
    name: 'CODICE1',
    type: String,
    required: true,
  })
  remove(@Param('CODICE1') CODICE1: string) {
    return this.x1TrasCodicisService.remove(CODICE1);
  }
}
