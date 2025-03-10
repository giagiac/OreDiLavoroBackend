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
import { infinityPagination } from '../utils/infinity-pagination';
import { nsorpeffcicliesec } from './domain/nsorpeffcicliesec';
import { CreatensorpeffcicliesecDto } from './dto/create-nsorpeffcicliesec.dto';
import { FindAllnsorpeffcicliesecsDto } from './dto/find-all-nsorpeffcicliesec.dto';
import { UpdatensorpeffcicliesecDto } from './dto/update-nsorpeffcicliesec.dto';
import { nsorpeffcicliesecService } from './nsorpeffcicliesec.service';

@ApiTags('NsOrpEffCicliEsec')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'nsorpeffcicliesecs',
  version: '1',
})
export class nsorpeffcicliesecController {
  constructor(
    private readonly nsorpeffcicliesecsService: nsorpeffcicliesecService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: nsorpeffcicliesec,
  })
  create(@Body() creatensorpeffcicliesecDto: CreatensorpeffcicliesecDto) {
    return this.nsorpeffcicliesecsService.create(creatensorpeffcicliesecDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(nsorpeffcicliesec),
  })
  async findAll(
    @Query() query: FindAllnsorpeffcicliesecsDto,
  ): Promise<InfinityPaginationResponseDto<nsorpeffcicliesec>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.nsorpeffcicliesecsService.findAllWithPagination({
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
    type: nsorpeffcicliesec,
  })
  findById(@Param('id') id: string) {
    return this.nsorpeffcicliesecsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: nsorpeffcicliesec,
  })
  update(
    @Param('id') id: string,
    @Body() updatensorpeffcicliesecDto: UpdatensorpeffcicliesecDto,
  ) {
    return this.nsorpeffcicliesecsService.update(
      id,
      updatensorpeffcicliesecDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.nsorpeffcicliesecsService.remove(id);
  }
}
