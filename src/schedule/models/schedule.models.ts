import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Room } from '../../room/models'
import { Types } from 'mongoose'
import { User } from '../../users/models'

export type ScheduleDocument = HydratedDocument<Schedule>

@Schema({ versionKey: false })
export class Schedule {
  @Prop({ required: true, type: Date })
  startDay: Date

  @Prop({ required: true, type: Date })
  endDay: Date

  @Prop({ required: true, type: Types.ObjectId, ref: Room.name })
  roomId: Room

  @Prop({ required: true, type: String, ref: User.name })
  email: string
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)
