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
import { ScheduleTasksService } from './schedule-tasks.service';
import { CreateScheduleTasksDto } from './dto/create-schedule-tasks.dto';
import { UpdateScheduleTasksDto } from './dto/update-schedule-tasks.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ScheduleTasks } from './domain/schedule-tasks';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllScheduleTasksDto } from './dto/find-all-schedule-tasks.dto';

@ApiTags('Scheduletasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'schedule-tasks',
  version: '1',
})
export class ScheduleTasksController {
  constructor(private readonly scheduleTasksService: ScheduleTasksService) {}

  @Post()
  @ApiCreatedResponse({
    type: ScheduleTasks,
  })
  create(@Body() createScheduleTasksDto: CreateScheduleTasksDto) {
    return this.scheduleTasksService.create(createScheduleTasksDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ScheduleTasks),
  })
  async findAll(
    @Query() query: FindAllScheduleTasksDto,
  ): Promise<InfinityPaginationResponseDto<ScheduleTasks>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.scheduleTasksService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('find-all-esec')
  @ApiOkResponse()
  async findAllEsec(): Promise<any> {
    return await this.scheduleTasksService.findAllEsec();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ScheduleTasks,
  })
  findById(@Param('id') id: string) {
    return this.scheduleTasksService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ScheduleTasks,
  })
  update(
    @Param('id') id: string,
    @Body() updateScheduleTasksDto: UpdateScheduleTasksDto,
  ) {
    return this.scheduleTasksService.update(id, updateScheduleTasksDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.scheduleTasksService.remove(id);
  }

  // -------------------------------------------------------

  @Post('trigger')
  async triggerAsyncTask() {
    await this.scheduleTasksService.myAsyncTask();
    return { message: 'Attività asincrona avviata tramite API.' };
  }
}
