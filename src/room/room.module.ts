import { Module } from '@nestjs/common'
import { RoomController } from './room.controller'
import { RoomService } from './room.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Room, RoomSchema } from './models'
import { RoomRepository } from './room.repository'

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])
  ],
  exports: [RoomService]
})
export class RoomModule {}
