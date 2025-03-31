import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { EpsNestjsTargaMezzi } from './domain/eps-nestjs-targa-mezzi';
import { CreateEpsNestjsTargaMezziDto } from './dto/create-eps-nestjs-targa-mezzi.dto';
import { FindAllEpsNestjsTargaMezziDto } from './dto/find-all-eps-nestjs-targa-mezzis.dto';
import { UpdateEpsNestjsTargaMezziDto } from './dto/update-eps-nestjs-targa-mezzi.dto';
import { EpsNestjsTargaMezzisService } from './eps-nestjs-targa-mezzis.service';

@ApiTags('Epsnestjstargamezzis')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'eps-nestjs-targa-mezzis',
  version: '1',
})
export class EpsNestjsTargaMezzisController {
  constructor(
    private readonly epsNestjsTargaMezzisService: EpsNestjsTargaMezzisService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: EpsNestjsTargaMezzi,
  })
  create(@Body() createEpsNestjsTargaMezziDto: CreateEpsNestjsTargaMezziDto) {
    return this.epsNestjsTargaMezzisService.create(
      createEpsNestjsTargaMezziDto,
    );
  }

  @Get()
    @ApiOkResponse({
      type: InfinityPaginationResponse(EpsNestjsTargaMezzi),
    })
    async findAll(
      @Query() query: FindAllEpsNestjsTargaMezziDto,
    ): Promise<InfinityPaginationResponseDto<EpsNestjsTargaMezzi>> {
      const page = query?.page ?? 1;
      let limit = query?.limit ?? 10;
      if (limit > 50) {
        limit = 50;
      }
  
      const filters = query.filters;
      const sort = query.sort;
      const join =
        query.othersFilters != null &&
        query.othersFilters.findIndex(
          (it) => it.key == 'join' && it.value == 'true',
        ) > -1;
  
      const { epsNestjsTargaMezzi, count } = await this.epsNestjsTargaMezzisService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        filterOptions: filters,
        sortOptions: sort,
        join,
      });
  
      return infinityPaginationQueryBuilder(epsNestjsTargaMezzi, count);
    }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: EpsNestjsTargaMezzi,
  })
  findById(@Param('id') id: string) {
    return this.epsNestjsTargaMezzisService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: EpsNestjsTargaMezzi,
  })
  update(
    @Param('id') id: string,
    @Body() updateEpsNestjsTargaMezziDto: UpdateEpsNestjsTargaMezziDto,
  ) {
    return this.epsNestjsTargaMezzisService.update(
      id,
      updateEpsNestjsTargaMezziDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.epsNestjsTargaMezzisService.remove(id);
  }
}
