import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards
} from '@nestjs/common'

import {
  GetCurrentPageRoomDto,
  GetCurrentRoomDto,
  PatchRoomDto,
  PostRoomDto
} from './dtos'

import { RoomService } from './room.service'
import { JwtAuthGuard } from '../auth/guards/jwt'
import { UserEmail } from '../decorators/userEmail'

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('/:page')
  public async getRooms(
    @Param() dto: GetCurrentPageRoomDto,
    @UserEmail() _email: string
  ) {
    return this.roomService.getRooms(Number(dto.page))
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('/current/:id')
  public async getCurrentRoom(@Param() dto: GetCurrentRoomDto) {
    return this.roomService.getCurrentRoom(dto)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post()
  public async createRoom(@Body() dto: PostRoomDto) {
    return this.roomService.createRoom(dto)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch()
  public async patchRoom(@Body() dto: PatchRoomDto) {
    return this.roomService.patchRoom(dto)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Delete()
  public async deleteRoom(@Body() dto: GetCurrentRoomDto) {
    return this.roomService.deleteRoom(dto)
  }
}
