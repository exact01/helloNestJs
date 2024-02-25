import { DeleteScheduleDto } from '../../dtos'
import { IJwtValidate } from '../../../auth/interfaces/jwt-validate.interface'

type TDeleteSchedule = InstanceType<typeof DeleteScheduleDto>
export interface IDeleteSchedule extends TDeleteSchedule {}
