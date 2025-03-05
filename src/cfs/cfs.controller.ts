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
import { CfsService } from './cfs.service';
import { CreateCfDto } from './dto/create-cf.dto';
import { UpdateCfDto } from './dto/update-cf.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Cf } from './domain/cf';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import {
  infinityPagination,
  infinityPaginationQueryBuilder,
} from '../utils/infinity-pagination';
import { FindAllCfsDto } from './dto/find-all-cfs.dto';

@ApiTags('Cfs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'cfs',
  version: '1',
})
export class CfsController {
  constructor(private readonly cfsService: CfsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Cf,
  })
  create(@Body() createCfDto: CreateCfDto) {
    return this.cfsService.create(createCfDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Cf),
  })
  async findAll(
    @Query() query: FindAllCfsDto,
  ): Promise<InfinityPaginationResponseDto<Cf>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const filters = query.filters;
    const sort = query.sort;
    const join = query.othersFilters != null && query.othersFilters.findIndex(it=> it.key == 'join' && it.value == 'true') > -1

    const { cf, count } = await this.cfsService.findAllWithPagination({
      paginationOptions: {
        page,
        limit,
      },
      filterOptions: filters,
      sortOptions: sort,
      join,
    });

    return infinityPaginationQueryBuilder(cf, count);
  }

  // @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: Cf,
  // })
  // findById(@Param('id') id: string) {
  //   return this.cfsService.findById(id);
  // }

  // @Patch(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: Cf,
  // })
  // update(@Param('id') id: string, @Body() updateCfDto: UpdateCfDto) {
  //   return this.cfsService.update(id, updateCfDto);
  // }

  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // remove(@Param('id') id: string) {
  //   return this.cfsService.remove(id);
  // }
}
