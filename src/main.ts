import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as process from 'process'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PROCESS_PORT || 3000)
}
bootstrap()
