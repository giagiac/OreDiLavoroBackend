import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { HypServReq2Service } from './hyp-serv-req2.service';
import { CreateHypServReq2Dto } from './dto/create-hyp-serv-req2.dto';
import { UpdateHypServReq2Dto } from './dto/update-hyp-serv-req2.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HypServReq2 } from './domain/hyp-serv-req2';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllHypServReq2Dto } from './dto/find-all-hyp-serv-req2.dto';

@ApiTags('HypServReq2')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'hyp-serv-req2',
  version: '1',
})
export class HypServReq2Controller {
  constructor(private readonly hypServReq2Service: HypServReq2Service) {}

  @Post()
  @ApiCreatedResponse({
    type: HypServReq2,
  })
  create(@Body() createHypServReq2Dto: CreateHypServReq2Dto) {
    return this.hypServReq2Service.create(createHypServReq2Dto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(HypServReq2),
  })
  async findAll(
    @Query() query: FindAllHypServReq2Dto,
  ): Promise<InfinityPaginationResponseDto<HypServReq2>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.hypServReq2Service.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':COD_CHIAVE')
  @ApiParam({
    name: 'COD_CHIAVE',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HypServReq2,
  })
  findById(@Param('COD_CHIAVE') COD_CHIAVE: number) {
    return this.hypServReq2Service.findById(COD_CHIAVE);
  }

  @Patch(':COD_CHIAVE')
  @ApiParam({
    name: 'COD_CHIAVE',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HypServReq2,
  })
  update(
    @Param('COD_CHIAVE') COD_CHIAVE: number,
    @Body() updateHypServReq2Dto: UpdateHypServReq2Dto,
  ) {
    return this.hypServReq2Service.update(COD_CHIAVE, updateHypServReq2Dto);
  }

  @Delete(':COD_CHIAVE')
  @ApiParam({
    name: 'COD_CHIAVE',
    type: String,
    required: true,
  })
  remove(@Param('COD_CHIAVE') COD_CHIAVE: number) {
    return this.hypServReq2Service.remove(COD_CHIAVE);
  }
}
