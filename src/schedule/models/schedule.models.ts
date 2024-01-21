import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Room } from '../../room/models'
import { Types } from 'mongoose'

export type ScheduleDocument = HydratedDocument<Schedule>

@Schema({ versionKey: false })
export class Schedule {
  @Prop({ required: true, min: 1, max: 31 })
  day: number

  @Prop({ type: Types.ObjectId, ref: Room.name })
  room_id: Room
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)
