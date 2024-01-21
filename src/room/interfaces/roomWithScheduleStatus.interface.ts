import { IRoom } from './room.interface'

export interface IRoomWithScheduleStatus extends IRoom {
  is_schedule: boolean
}
