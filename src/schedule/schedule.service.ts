import { Injectable, UseFilters } from '@nestjs/common'

import {
  ICreateSchedule,
  IDeleteSchedule,
  IGetSchedule,
  IPatchSchedule
} from './interfeces/service'
import { ScheduleExceptionFilter } from './exeption/shcedule.exption.filter'
import { ScheduleRepository } from './schedule.repository'
import { ScheduleException } from './exeption'
import { ScheduleErrors } from './exeption/errors'
import moment from 'moment-timezone'
import { RoomService } from '../room/room.service'

@UseFilters(ScheduleExceptionFilter)
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
      throw new ScheduleException(ScheduleErrors.SCHEDULE_NOT_FOUND.code)
    }
    return schedule
  }

  private async ensureGoodTime({ id, startDay, endDay }: IPatchSchedule) {
    const startMomentDay = moment.utc(startDay).startOf('day')
    const endMomentDay = moment.utc(endDay).startOf('day')

    if (startMomentDay.isAfter(endMomentDay)) {
      throw new ScheduleException(ScheduleErrors.SCHEDULE_VALIDATION_DAY.code)
    }

    const isReserved = await this.scheduleRepository.isReservedSchedule({
      roomId: id,
      endDay: endMomentDay,
      startDay: startMomentDay
    })

    if (isReserved) {
      throw new ScheduleException(ScheduleErrors.SCHEDULE_EXISTS.code)
    }

    return { startMomentDay, endMomentDay }
  }
}
