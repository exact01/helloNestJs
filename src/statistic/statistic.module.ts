import { Module } from '@nestjs/common'
import { StatisticController } from './statistic.controller'
import { StatisticService } from './statistic.service'
import { StatisticRepository } from './statistic.repository'
import { Room, RoomSchema } from '../room/models'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  controllers: [StatisticController],
  providers: [StatisticService, StatisticRepository],
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])
  ]
})
export class StatisticModule {}
