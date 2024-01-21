import { Module } from '@nestjs/common'
import { AuthController } from './auth/auth.controller'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from './schedule/schedule.module'
import { RoomModule } from './room/room.module'
import { UsersModule } from './users/users.module'
import { AuthService } from './auth/auth.service'
import { MongooseConfigService } from './configs/mongooseConfig/mongooseConfig.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    ScheduleModule,
    RoomModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
