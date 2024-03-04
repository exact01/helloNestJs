import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { TelegramService } from './telegram.service'
import { ITelegramModuleAsyncOptionInterface } from './interfaces/telegram-module-async-option.interface'
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants'

@Global()
@Module({})
export class TelegramModule {
  static forRootAsync(
    options: ITelegramModuleAsyncOptionInterface
  ): DynamicModule {
    const asyncOptions = this.createAsyncOptionsProvider(options)

    return {
      module: TelegramModule,
      imports: options.imports,
      providers: [TelegramService, asyncOptions],
      exports: [TelegramService]
    }
  }

  private static createAsyncOptionsProvider(
    options: ITelegramModuleAsyncOptionInterface
  ): Provider {
    return {
      provide: TELEGRAM_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || []
    }
  }
}
