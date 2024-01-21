import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Patch,
  Param
} from '@nestjs/common'
import {
  GetCurrentPageRoomDto,
  GetCurrentRoomDto,
  PatchRoomDto,
  RoomDto
} from './dtos'
import { RoomService } from './room.service'

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}
  @Get('/:page')
  public async getRooms(@Param() dto: GetCurrentPageRoomDto) {
    // TODO VALIDATOR page !== 0
    if (Number(dto.page) === 0) {
      return []
    }
    return this.roomService.getRooms(Number(dto.page))
  }

  @Get('/current/:id')
  public async getCurrentRoom(@Param() dto: GetCurrentRoomDto) {
    return this.roomService.getCurrentRoom(dto)
  }

  @HttpCode(201)
  @Post()
  public async createRoom(@Body() dto: RoomDto) {
    return this.roomService.createRoom(dto)
  }

  @Patch()
  public async patchRoom(@Body() dto: PatchRoomDto) {
    return this.roomService.patchRoom(dto)
  }

  @Delete()
  public async deleteRoom(@Body() dto: GetCurrentRoomDto) {
    return this.roomService.deleteRoom(dto)
  }
}
