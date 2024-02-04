import { PatchRoomDto } from '../../dtos'

type TRoomPatch = InstanceType<typeof PatchRoomDto>

export interface IRoomPatch extends TRoomPatch {}
