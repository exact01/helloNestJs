import { Module } from '@nestjs/common'
import { ScheduleController } from './schedule.controller'
import { ScheduleService } from './schedule.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Schedule, ScheduleSchema } from './models'
import { ScheduleRepository } from './schedule.repository'
import { RoomModule } from '../room/room.module'

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository],
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema }
    ]),
    RoomModule
  ]
})
export class ScheduleModule {}
