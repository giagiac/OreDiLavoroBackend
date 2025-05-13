import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { OrdCliRighesService } from './ord-cli-righes.service';
import { CreateOrdCliRigheDto } from './dto/create-ord-cli-righe.dto';
import { UpdateOrdCliRigheDto } from './dto/update-ord-cli-righe.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { OrdCliRighe } from './domain/ord-cli-righe';
import { AuthGuard } from '@nestjs/passport';
import { InfinityPaginationResponse, InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllOrdCliRighesDto } from './dto/find-all-ord-cli-righes.dto';

@ApiTags('Ordclirighes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'ord-cli-righes',
  version: '1',
})
export class OrdCliRighesController {
  constructor(private readonly ordCliRighesService: OrdCliRighesService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrdCliRighe,
  })
  create(@Body() createOrdCliRigheDto: CreateOrdCliRigheDto) {
    return this.ordCliRighesService.create(createOrdCliRigheDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrdCliRighe),
  })
  async findAll(@Query() query: FindAllOrdCliRighesDto): Promise<InfinityPaginationResponseDto<OrdCliRighe>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.ordCliRighesService.findAllWithPagination({
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
    type: OrdCliRighe,
  })
  findById(@Param('id') id: string) {
    return this.ordCliRighesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrdCliRighe,
  })
  update(@Param('id') id: string, @Body() updateOrdCliRigheDto: UpdateOrdCliRigheDto) {
    return this.ordCliRighesService.update(id, updateOrdCliRigheDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.ordCliRighesService.remove(id);
  }
}
