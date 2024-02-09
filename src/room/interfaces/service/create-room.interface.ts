import { PostRoomDto } from '../../dtos'

type TCreateRoom = InstanceType<typeof PostRoomDto>
export interface ICreateRoom extends TCreateRoom {}
