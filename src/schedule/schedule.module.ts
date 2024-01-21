import { Module } from '@nestjs/common'
import { ScheduleController } from './schedule.controller'
import { ScheduleService } from './schedule.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Schedule, ScheduleSchema } from './models'
import { Room, RoomSchema } from '../room/models'
import { RoomService } from '../room/room.service'

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, RoomService],
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema }
    ]),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])
  ]
})
export class ScheduleModule {}
