import { ConfigService } from '@nestjs/config'
import { ITelegramOptions } from '../../../telegram/interfaces'

export const getTelegramConfig = (
  configService: ConfigService
): ITelegramOptions => {
  const token = configService.getOrThrow('TOKEN_TELEGRAM')
  return {
    token,
    chatId: configService.getOrThrow('CHAT_ID_TELEGRAM')
  }
}
