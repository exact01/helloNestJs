import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Schedule, ScheduleDocument } from './models'
import { Model, Types } from 'mongoose'
import { ICreateSchedule, IPatchSchedule } from './interfeces/service'
import { IReservedScheduleInterface } from './interfeces/repository'

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>
  ) {}

  public async isReservedSchedule({
    roomId,
    endDay,
    startDay
  }: IReservedScheduleInterface) {
    const overlappingReservation = await this.scheduleModel.findOne({
      roomId,
      $or: [
        { startDay: { $gte: startDay.toDate(), $lt: endDay.toDate() } },

        { endDay: { $gt: startDay.toDate(), $lte: endDay.toDate() } },
        {
          startDay: { $lte: startDay.toDate() },
          endDay: { $gte: endDay.toDate() }
        }
      ]
    })

    return !!overlappingReservation
  }
  public async createSchedule({ startDay, endDay, roomId }: ICreateSchedule) {
    return this.scheduleModel.create({ startDay, endDay, roomId })
  }

  public async getSchedule() {
    return this.scheduleModel.find().exec()
  }

  public async getByScheduleId(id: string) {
    return this.scheduleModel.findById(id).exec()
  }
  public getScheduleByRoomId(id: string) {
    return this.scheduleModel.find({ roomId: new Types.ObjectId(id) }).exec()
  }

  public deleteManyScheduleByRoomId(id: string) {
    return this.scheduleModel
      .deleteMany({ roomId: new Types.ObjectId(id) })
      .exec()
  }

  public patchSchedule({ startDay, endDay, id }: IPatchSchedule) {
    return this.scheduleModel.findByIdAndUpdate(
      { _id: id },
      { $set: { startDay: startDay, endDay: endDay } },
      { new: true }
    )
  }

  public searchScheduleById(id: string) {
    return this.scheduleModel.findById(id).exec()
  }
}
