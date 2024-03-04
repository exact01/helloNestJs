import { ModuleMetadata } from '@nestjs/common'
import { ITelegramOptions } from './telegram-options'

export interface ITelegramModuleAsyncOptionInterface
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<ITelegramOptions> | ITelegramOptions
  inject?: any[]
}
