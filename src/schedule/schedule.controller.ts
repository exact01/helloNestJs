import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
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
import { HttpExceptionFilter } from '../common/utils/filters/exceptions/http-exception-filter'
import { JwtAuthGuard } from '../common/guards/jwt'
import { GetUser } from '../common/decorators/getPayloadJwt/getPayloadJwt'
import { IJwtValidate } from '../auth/interfaces/jwt-validate.interface'
import { VerifyReservationOwnerGuard } from '../common/guards/verifyReservationOwnerGuard/verifyReservationOwnerGuard'

@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @UsePipes(new ValidationPipe())
  @Get('/:id')
  public async getSchedule(@Param() dto: GetScheduleDto) {
    return this.scheduleService.getScheduleById(dto)
  }

  @Get()
  public async getSchedules() {
    return this.scheduleService.getSchedules()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post()
  public async createSchedule(
    @Body() dto: PostScheduleDto,
    @GetUser() user: IJwtValidate
  ) {
    return this.scheduleService.createSchedule({ ...dto, user })
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(VerifyReservationOwnerGuard)
  @Patch()
  public async patchSchedule(@Body() dto: PatchScheduleDto) {
    return this.scheduleService.patchSchedule(dto)
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(VerifyReservationOwnerGuard)
  @Delete()
  public async deleteSchedule(@Body() dto: DeleteScheduleDto) {
    return this.scheduleService.deleteSchedule({ id: dto.id })
  }
}
