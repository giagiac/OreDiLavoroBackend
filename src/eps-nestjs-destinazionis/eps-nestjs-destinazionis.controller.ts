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
import { EpsNestjsDestinazionisService } from './eps-nestjs-destinazionis.service';
import { CreateEpsNestjsDestinazioniDto } from './dto/create-eps-nestjs-destinazioni.dto';
import { UpdateEpsNestjsDestinazioniDto } from './dto/update-eps-nestjs-destinazioni.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EpsNestjsDestinazioni } from './domain/eps-nestjs-destinazioni';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllEpsNestjsDestinazionisDto } from './dto/find-all-eps-nestjs-destinazionis.dto';

@ApiTags('Epsnestjsdestinazionis')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'eps-nestjs-destinazionis',
  version: '1',
})
export class EpsNestjsDestinazionisController {
  constructor(
    private readonly epsNestjsDestinazionisService: EpsNestjsDestinazionisService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: EpsNestjsDestinazioni,
  })
  create(
    @Body() createEpsNestjsDestinazioniDto: CreateEpsNestjsDestinazioniDto,
  ) {
    return this.epsNestjsDestinazionisService.create(
      createEpsNestjsDestinazioniDto,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(EpsNestjsDestinazioni),
  })
  async findAll(
    @Query() query: FindAllEpsNestjsDestinazionisDto,
  ): Promise<InfinityPaginationResponseDto<EpsNestjsDestinazioni>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.epsNestjsDestinazionisService.findAllWithPagination({
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
    type: EpsNestjsDestinazioni,
  })
  findById(@Param('id') id: string) {
    return this.epsNestjsDestinazionisService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: EpsNestjsDestinazioni,
  })
  update(
    @Param('id') id: string,
    @Body() updateEpsNestjsDestinazioniDto: UpdateEpsNestjsDestinazioniDto,
  ) {
    return this.epsNestjsDestinazionisService.update(
      id,
      updateEpsNestjsDestinazioniDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.epsNestjsDestinazionisService.remove(id);
  }
}
