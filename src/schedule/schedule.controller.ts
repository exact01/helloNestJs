import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
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

  @UsePipes(new ValidationPipe())
  @Get('/:id')
  public async getSchedule(@Param() dto: GetScheduleDto) {
    return this.scheduleService.getSchedule(dto)
  }

  @Get()
  public async getAllSchedule() {
    return this.scheduleService.getAllSchedule()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post()
  public async createSchedule(@Body() dto: PostScheduleDto) {
    return this.scheduleService.createSchedule(dto)
  }

  @UsePipes(new ValidationPipe())
  @Patch()
  public async patchSchedule(@Body() dto: PatchScheduleDto) {
    return this.scheduleService.patchSchedule(dto)
  }

  @UsePipes(new ValidationPipe())
  @Delete()
  public async deleteSchedule(@Body() dto: DeleteScheduleDto) {
    return this.scheduleService.deleteSchedule(dto)
  }
}
