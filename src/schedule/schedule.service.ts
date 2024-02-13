import { Injectable, UseFilters } from '@nestjs/common'

import {
  ICreateSchedule,
  IDeleteSchedule,
  IGetSchedule,
  IPatchSchedule
} from './interfeces/service'
import { ScheduleRepository } from './schedule.repository'

import { ScheduleErrors } from './constants/errors'
import moment from 'moment-timezone'
import { RoomService } from '../room/room.service'
import { HttpExceptionFilter } from '../common/utils/filters/exceptions/http-exception-filter'
import { AppException } from '../common/utils/filters/exceptions/app-exception'

@UseFilters(HttpExceptionFilter)
@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly roomService: RoomService
  ) {}

  public async getScheduleById({ id }: IGetSchedule) {
    return this.searchScheduleById(id)
  }

  public async getSchedules() {
    return this.scheduleRepository.getSchedule()
  }

  public async createSchedule({ startDay, endDay, roomId }: ICreateSchedule) {
    await this.roomService.ensureRoomExists(roomId)

    const { startMomentDay, endMomentDay } = await this.ensureGoodTime({
      id: roomId,
      endDay,
      startDay
    })

    return this.scheduleRepository.createSchedule({
      startDay: startMomentDay.toString(),
      endDay: endMomentDay.toString(),
      roomId
    })
  }

  public async deleteSchedule({ id }: IDeleteSchedule) {
    const scheduleDb = await this.searchScheduleById(id)
    await scheduleDb.deleteOne()
    return { isDeleted: true }
  }

  public async patchSchedule({ id, startDay, endDay }: IPatchSchedule) {
    await this.searchScheduleById(id)

    const { startMomentDay, endMomentDay } = await this.ensureGoodTime({
      id,
      endDay,
      startDay
    })

    return this.scheduleRepository.patchSchedule({
      id,
      startDay: startMomentDay.toISOString(),
      endDay: endMomentDay.toISOString()
    })
  }

  private async searchScheduleById(id: string) {
    const schedule = await this.scheduleRepository.getByScheduleId(id)
    if (!schedule) {
      throw new AppException(ScheduleErrors.SCHEDULE_NOT_FOUND)
    }
    return schedule
  }

  private async ensureGoodTime({ id, startDay, endDay }: IPatchSchedule) {
    const startMomentDay = moment.utc(startDay).startOf('day')
    const endMomentDay = moment.utc(endDay).startOf('day')

    if (startMomentDay.isAfter(endMomentDay)) {
      throw new AppException(ScheduleErrors.SCHEDULE_VALIDATION_DAY)
    }

    const isReserved = await this.scheduleRepository.isReservedSchedule({
      roomId: id,
      endDay: endMomentDay,
      startDay: startMomentDay
    })

    if (isReserved) {
      throw new AppException(ScheduleErrors.SCHEDULE_EXISTS)
    }

    return { startMomentDay, endMomentDay }
  }
}
