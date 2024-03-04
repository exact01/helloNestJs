import {
  Controller,
  Get,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { HttpExceptionFilter } from '../common/utils/filters/exceptions/http-exception-filter'
import { StatisticService } from './statistic.service'
import { GetScheduleDto } from './dtos'

@UseFilters(HttpExceptionFilter)
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  getRoomBookingsForMonth(@Query() dto: GetScheduleDto) {
    return this.statisticService.getRoomBookingsForMonth(dto)
  }
}
