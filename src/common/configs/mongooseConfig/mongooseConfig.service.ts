import { Injectable } from '@nestjs/common'
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  protected readonly port: number
  protected readonly username: string
  protected readonly password: string
  protected readonly dataBaseName: string
  protected readonly dataBaseIpAddress: string
  constructor(private configService: ConfigService) {
    this.port = Number(
      configService.get<string>('MONGO_INITDB_ROOT_PORT').trim()
    )
    this.username = configService
      .get<string>('MONGO_INITDB_ROOT_USERNAME')
      .trim()
    this.password = configService
      .get<string>('MONGO_INITDB_ROOT_PASSWORD')
      .trim()
    this.dataBaseName = configService
      .get<string>('MONGO_INITDB_DATABASE')
      .trim()
    this.dataBaseIpAddress = configService
      .get<string>('MONGO_IP_ADDRESS')
      .trim()
  }
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: `mongodb://${this.username}:${this.password}@${this.dataBaseIpAddress}:${this.port}/${this.dataBaseName}?authSource=admin`
    }
  }
}
