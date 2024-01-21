import { Module } from '@nestjs/common'
import { RoomController } from './room.controller'
import { RoomService } from './room.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Room, RoomSchema } from './models'
import { Schedule, ScheduleSchema } from '../schedule/models'

@Module({
  controllers: [RoomController],
  providers: [RoomService],
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: Schedule.name, schema: ScheduleSchema }])
  ]
})
export class RoomModule {}
