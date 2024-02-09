import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Room, RoomDocument } from './models'
import { Model } from 'mongoose'
import { IGetRooms } from './interfaces/reopository'
import { ICreateRoom } from './interfaces/service'
import { IRoomPatch } from './interfaces/service/patch-room.interface'

@Injectable()
export class RoomRepository {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>
  ) {}

  public async getRooms({ limit, offset }: IGetRooms) {
    return this.roomModel.find().skip(offset).limit(limit)
  }

  public async getRoomById(id: string) {
    return this.roomModel.findById(id).exec()
  }

  public async deleteRoomById(id: string) {
    return this.roomModel.deleteOne({ _id: id }).exec()
  }

  public async createRoom(room: ICreateRoom) {
    return this.roomModel.create({ ...room })
  }

  public async patchRoom(room: IRoomPatch) {
    const { id, ...updateRoom } = room

    return this.roomModel
      .findByIdAndUpdate(id, updateRoom, {
        new: true
      })
      .exec()
  }
}
