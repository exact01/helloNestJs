import { PostScheduleDto } from '../../dtos'

type TCreateSchedule = InstanceType<typeof PostScheduleDto>
export interface ICreateSchedule extends TCreateSchedule {}
