import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type RoomDocument = HydratedDocument<Room>

@Schema({
  versionKey: false
})
export class Room {
  @Prop({ required: true, type: Number })
  roomNumber: number
  @Prop({ required: true, type: String })
  roomType: string
  @Prop({ required: true, type: String })
  roomDescription: string
  @Prop({ required: true, type: Boolean })
  isSeaView: boolean
}

export const RoomSchema = SchemaFactory.createForClass(Room)
