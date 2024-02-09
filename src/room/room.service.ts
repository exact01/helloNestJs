import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Room, RoomDocument } from './models'
import { Model } from 'mongoose'
import { IRoomWithScheduleStatus } from './interfaces/reopository'
import { RoomRepository } from './room.repository'
import { RoomErrors, RoomException } from './exception'
import { IGetRoom, ICreateRoom } from './interfaces/service'
import { IGetCurrentPage } from './interfaces/service/get-current-page.interface'
import { IRoomPatch } from './interfaces/service/patch-room.interface'

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private readonly roomRepository: RoomRepository
  ) {}

  public async getRooms({ page }: IGetCurrentPage) {
    const currentDay = new Date().getDate()
    const limit = 250
    const offset = (+page - 1) * limit
    return this.roomRepository.getRooms({ offset, currentDay, limit })
  }

  public async getCurrentRoom({ id }: IGetRoom) {
    return this.ensureRoomExists(id)
  }

  public async deleteRoom({ id }: IGetRoom) {
    await this.ensureRoomExists(id)
    const result = await this.roomRepository.deleteRoomById(id)

    return { isDeleted: !!result.deletedCount }
  }

  public async createRoom(room: ICreateRoom): Promise<IRoomWithScheduleStatus> {
    const newRoom = await this.roomRepository.createRoom(room)
    return { ...newRoom.toObject(), isSchedule: false }
  }

  public async patchRoom(room: IRoomPatch): Promise<IRoomWithScheduleStatus> {
    await this.ensureRoomExists(room.id)

    const result = await this.roomRepository.patchRoom(room)

    return { ...result.toObject(), isSchedule: false }
  }

  public async ensureRoomExists(id: string) {
    const currentRoom = await this.roomRepository.getRoomById(id)

    if (!currentRoom) {
      throw new RoomException(RoomErrors.ROOM_NOT_FOUND.code)
    }
    return currentRoom.toObject()
  }
}
