import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from './schedule/schedule.module'
import { RoomModule } from './room/room.module'
import { MongooseConfigService } from './common/configs/mongooseConfig/mongooseConfig.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './common/utils/filters/exceptions/http-exception-filter'
import { StatisticModule } from './statistic/statistic.module'
import { FilesModule } from './files/files.module'
import { TelegramModule } from './telegram/telegram.module'
import { getTelegramConfig } from './common/configs/telegram/telegram.config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    ScheduleModule,
    RoomModule,
    AuthModule,
    UsersModule,
    StatisticModule,
    FilesModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig
    })
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {}
