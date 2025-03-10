import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPaginationQueryBuilder } from '../utils/infinity-pagination';
import { CfCommService } from './cf-comm.service';
import { CfComm } from './domain/cf-comm';
import { CreateCfCommDto } from './dto/create-cf-comm.dto';
import { FindAllCfCommDto } from './dto/find-all-cf-comms.dto';

@ApiTags('Cfcomm')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'cf-comms',
  version: '1',
})
export class CfCommController {
  constructor(private readonly cfCommsService: CfCommService) {}

  @Post()
  @ApiCreatedResponse({
    type: CfComm,
  })
  create(@Body() createCfCommDto: CreateCfCommDto) {
    return this.cfCommsService.create(createCfCommDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(CfComm),
  })
  async findAll(
    @Query() query: FindAllCfCommDto,
  ): Promise<InfinityPaginationResponseDto<CfComm>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 200) {
      limit = 200;
    }

    const filters = query.filters;
    const sort = query.sort;

    const { cf, count } = await this.cfCommsService.findAllWithPagination({
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
    type: CfComm,
  })
  findById(@Param('id') id: string) {
    return this.cfCommsService.findById(id);
  }

  // @Get('listCfComm/:COD_CF')
  // @ApiParam({
  //   name: 'COD_CF',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: Array<CfComm>,
  // })
  // findByCodCf(@Param('COD_CF') COD_CF: string) {
  //   return this.cfCommsService.findByCodCf(COD_CF);
  // }

  // @Patch(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: CfComm,
  // })
  // update(@Param('id') id: string, @Body() updateCfCommDto: UpdateCfCommDto) {
  //   return this.cfCommsService.update(id, updateCfCommDto);
  // }

  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // remove(@Param('id') id: string) {
  //   return this.cfCommsService.remove(id);
  // }
}
