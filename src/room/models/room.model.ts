import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type RoomDocument = HydratedDocument<Room>

@Schema({ versionKey: false })
export class Room {
  @Prop({ required: true })
  room_number: number
  @Prop({ required: true })
  room_type: string
  @Prop({ required: true })
  room_description: string
  @Prop({ required: true })
  is_sea_view: boolean
}

export const RoomSchema = SchemaFactory.createForClass(Room)
