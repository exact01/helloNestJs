import { IRoom } from './room.interface'

export interface IRoomWithScheduleStatus extends IRoom {
  isSchedule: boolean
}
