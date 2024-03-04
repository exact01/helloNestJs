import { PostScheduleDto } from '../../dtos'
import { IJwtValidate } from '../../../auth/interfaces/jwt-validate.interface'

type TCreateSchedule = InstanceType<typeof PostScheduleDto>
export interface ICreateSchedule extends TCreateSchedule {
  user: IJwtValidate
}
