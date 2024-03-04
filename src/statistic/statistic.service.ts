import { Injectable } from '@nestjs/common'
import { IGetBookingsForMonth } from './interfaces'
import { StatisticRepository } from './statistic.repository'
import moment from 'moment/moment'

@Injectable()
export class StatisticService {
  constructor(private readonly statisticRepository: StatisticRepository) {}
  async getRoomBookingsForMonth(dto: IGetBookingsForMonth) {
    const currentYear = moment.utc().year()
    const currentMonth = moment.utc().month() + 1

    const year = dto.year ?? currentYear
    const month = dto.month ?? currentMonth

    const startOfMonth = moment
      .utc([year, month - 1])
      .startOf('month')
      .toDate()
    const endOfMonth = moment
      .utc([year, month - 1])
      .endOf('month')
      .toDate()

    return this.statisticRepository.getRoomBookingsForMonth({
      startOfMonth,
      endOfMonth
    })
  }
}
