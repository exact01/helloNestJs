import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Schedule, ScheduleDocument } from './models'
import { Model } from 'mongoose'
import {
  DeleteScheduleDto,
  GetScheduleDto,
  PatchScheduleDto,
  PostScheduleDto
} from './dtos'
import { Room, RoomDocument } from '../room/models'
import { RoomService } from '../room/room.service'

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
    private roomService: RoomService
  ) {}

  public async getSchedule(dto: GetScheduleDto) {
    return this.scheduleModel.findById(dto.id)
  }

  public async getAllSchedule() {
    return this.scheduleModel.find()
  }
  public async createSchedule(dto: PostScheduleDto) {
    await this.ensureRoomExists(dto.room_id)
    await this.ensureScheduleDoesNotExist(dto.room_id)

    return this.scheduleModel.create(dto)
  }

  public async deleteSchedule(dto: DeleteScheduleDto) {
    await this.ensureScheduleDoesExist(dto.id)
    await this.scheduleModel.deleteOne({ _id: dto.id })

    return { message: 'Schedule deleted successfully.' }
  }

  public async patchSchedule(dto: PatchScheduleDto) {
    await this.ensureRoomExists(dto.room_id)
    await this.ensureScheduleDoesExist(dto.id)

    return this.scheduleModel.findByIdAndUpdate(
      { _id: dto.id },
      { $set: { day: dto.day } },
      { new: true }
    )
  }

  private async searchScheduleById(id: string): Promise<boolean> {
    const findSchedule = await this.scheduleModel.findOne({
      _id: id
    })
    return !!findSchedule
  }

  private async ensureScheduleDoesExist(id: string) {
    const scheduleExists = await this.searchScheduleById(id)
    if (!scheduleExists) {
      throw new NotFoundException(`Schedule with ID ${id} not found.`)
    }
  }

  private async ensureScheduleDoesNotExist(roomId: string) {
    const scheduleExists = await this.searchScheduleById(roomId)
    if (scheduleExists) {
      throw new ConflictException('Schedule already exists.')
    }
  }

  private async ensureRoomExists(roomId: string) {
    const roomExists = await this.roomService.searchRoomById(roomId)
    if (!roomExists) {
      throw new NotFoundException('Room not found.')
    }
  }
}
