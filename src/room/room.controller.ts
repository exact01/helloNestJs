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
  UseFilters,
  UseGuards
} from '@nestjs/common'

import {
  GetCurrentPageRoomDto,
  GetCurrentRoomDto,
  PatchRoomDto,
  PostRoomDto
} from './dtos'

import { RoomService } from './room.service'
import { JwtAuthGuard } from '../common/guards/jwt'
import { UserDataDecorator } from '../common/decorators/userData'
import { HttpExceptionFilter } from '../common/utils/filters/exceptions/http-exception-filter'
import { Role, Roles } from '../common/decorators/roles'
import { RolesGuard } from '../common/guards/roles'
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(HttpExceptionFilter)
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @UsePipes(new ValidationPipe())
  @Get('/:page')
  public async getRooms(
    @Param() dto: GetCurrentPageRoomDto,
    @UserDataDecorator() _email: string
  ) {
    return this.roomService.getRooms(dto)
  }

  @UsePipes(new ValidationPipe())
  @Get('/current/:id')
  public async getCurrentRoom(@Param() dto: GetCurrentRoomDto) {
    return this.roomService.getCurrentRoom(dto)
  }

  @UsePipes(new ValidationPipe())
  @Roles(Role.ADMIN)
  @HttpCode(201)
  @Post()
  public async createRoom(@Body() dto: PostRoomDto) {
    return this.roomService.createRoom(dto)
  }

  @UsePipes(new ValidationPipe())
  @Roles(Role.ADMIN)
  @Patch()
  public async patchRoom(@Body() dto: PatchRoomDto) {
    return this.roomService.patchRoom(dto)
  }

  @UsePipes(new ValidationPipe())
  @Roles(Role.ADMIN)
  @Delete()
  public async deleteRoom(@Body() dto: GetCurrentRoomDto) {
    return this.roomService.deleteRoom(dto)
  }
}
