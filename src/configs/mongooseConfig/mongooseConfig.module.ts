import { Module } from '@nestjs/common'
import { MongooseConfigService } from './mongooseConfig.service'

@Module({
  providers: [MongooseConfigService]
})
export class MongooseConfigModule {}
