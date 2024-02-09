import { GetCurrentRoomDto } from '../../dtos'

type TPatchRoomDto = InstanceType<typeof GetCurrentRoomDto>

export interface IGetRoom extends TPatchRoomDto {}
