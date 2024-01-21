import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import {
  DeleteScheduleDto,
  GetScheduleDto,
  PatchScheduleDto,
  PostScheduleDto
} from './dtos'
import { ScheduleService } from './schedule.service'

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get('/:id')
  public async getSchedule(@Param() dto: GetScheduleDto) {
    return this.scheduleService.getSchedule(dto)
  }

  @Get()
  public async getAllSchedule() {
    return this.scheduleService.getAllSchedule()
  }

  @HttpCode(201)
  @Post()
  public async createSchedule(@Body() dto: PostScheduleDto) {
    return this.scheduleService.createSchedule(dto)
  }

  @Patch()
  public async patchSchedule(@Body() dto: PatchScheduleDto) {
    return this.scheduleService.patchSchedule(dto)
  }

  @Delete()
  public async deleteSchedule(@Body() dto: DeleteScheduleDto) {
    return this.scheduleService.deleteSchedule(dto)
  }
}
