import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '../common/strategies/jwt'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { getJWTConfig } from '../common/configs/jwt'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig
    }),
    PassportModule,
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule
  ]
})
export class AuthModule {}
