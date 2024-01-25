import {
  Body,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Room, RoomDocument } from './models'
import { Model, Types } from 'mongoose'
import { RoomDto, PatchRoomDto, GetCurrentRoomDto } from './dtos'
import { Schedule, ScheduleDocument } from '../schedule/models'
import { IRoomWithScheduleStatus } from './interfaces'

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>
  ) {}

  public async getRooms(
    page: number,
    pageSize: number = 250
  ): Promise<IRoomWithScheduleStatus[]> {
    const skipCount = (page - 1) * pageSize
    const rooms = await this.roomModel.find().skip(skipCount).limit(pageSize)

    return Promise.all(
      rooms.map(async (room): Promise<IRoomWithScheduleStatus> => {
        const isSchedule = await this.checkIfIdExistsOnDate(room._id)
        return { ...room.toObject(), is_schedule: isSchedule }
      })
    )
  }

  public async getCurrentRoom(
    room: GetCurrentRoomDto
  ): Promise<IRoomWithScheduleStatus> {
    const { id } = room
    await this.ensureRoomExists(id)

    const findRoom = await this.roomModel.findOne({ _id: id })
    const isSchedule = await this.checkIfIdExistsOnDate(findRoom._id)

    return { ...findRoom.toObject(), is_schedule: isSchedule }
  }

  public async deleteRoom(room: GetCurrentRoomDto) {
    const { id } = room
    await this.ensureRoomExists(id)
    await this.roomModel.deleteOne({ _id: id })
    // TODO ON CASCADE MONGO
    await this.scheduleModel.deleteMany({ room_id: id })
    return { message: 'Room deleted successfully.' }
  }

  public async createRoom(room: RoomDto): Promise<IRoomWithScheduleStatus> {
    await this.ensureRoomDoesNotExist(room.room_number)

    const newRoom = await this.roomModel.create({ ...room })
    return { ...newRoom.toObject(), is_schedule: false }
  }

  public async patchRoom(
    @Body() room: PatchRoomDto
  ): Promise<IRoomWithScheduleStatus> {
    const { id, room_number: _room_number, ...updateRoom } = room
    await this.ensureRoomExists(id)

    const result = await this.roomModel.findByIdAndUpdate(id, updateRoom, {
      new: true
    })
    const isSchedule = await this.checkIfIdExistsOnDate(result._id)

    return { ...result.toObject(), is_schedule: isSchedule }
  }

  public async searchRoomById(id: string): Promise<boolean> {
    const findRoom = await this.roomModel.findById(id)

    return !!findRoom
  }

  private async searchRoomByNumberRoom(roomNumber: number): Promise<boolean> {
    const findRoom = await this.roomModel.findOne({
      room_number: roomNumber
    })

    return !!findRoom
  }

  private async getCurrentDay(): Promise<number> {
    return new Date().getDate()
  }

  private async checkIfIdExistsOnDate(_id: Types.ObjectId): Promise<boolean> {
    const currentDay = await this.getCurrentDay()

    const existingEntry = await this.scheduleModel.findOne({
      room_id: _id,
      day: currentDay
    })

    return !!existingEntry
  }

  public async ensureRoomExists(roomId: string) {
    const roomExists = await this.searchRoomById(roomId)
    if (!roomExists) {
      throw new NotFoundException('Room not found.')
    }
  }

  private async ensureRoomDoesNotExist(roomNumber: number) {
    const roomExists = await this.searchRoomByNumberRoom(roomNumber)
    if (roomExists) {
      throw new ConflictException('Room already exists.')
    }
  }
}
