import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from './schedule/schedule.module'
import { RoomModule } from './room/room.module'
import { MongooseConfigService } from './configs/mongooseConfig/mongooseConfig.service'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    ScheduleModule,
    RoomModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
