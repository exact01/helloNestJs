import { Injectable } from '@nestjs/common'
import { IGetBookingForMonthRequired } from './interfaces'
import { InjectModel } from '@nestjs/mongoose'
import { Room, RoomDocument } from '../room/models'
import { Model } from 'mongoose'
import { IBookingAggregationResult } from './interfaces'
import { aggregationPipeline } from './ aggregations/getCountReservationOnMonth'

@Injectable()
export class StatisticRepository {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>
  ) {}

  async getRoomBookingsForMonth({
    startOfMonth,
    endOfMonth
  }: IGetBookingForMonthRequired): Promise<IBookingAggregationResult[]> {
    return this.roomModel.aggregate<IBookingAggregationResult>(
      aggregationPipeline({ startOfMonth, endOfMonth })
    )
  }
}
