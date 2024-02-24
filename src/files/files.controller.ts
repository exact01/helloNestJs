import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '../common/guards/jwt'
import { FileElementResponse } from './dtos'
import { FilesService } from './files.service'
import { MFile } from './mfile.class'

@Controller('files')
export class FilesController {
  constructor(private readonly filesServices: FilesService) {}
  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<FileElementResponse[]> {
    const array: MFile[] = [file]
    if (file.mimetype.includes('image')) {
      const webP = await this.filesServices.convertToWebP(file.buffer)
      array.push(
        new MFile({
          originalname: `${file.originalname.split('.')[0]}.webp`,
          buffer: webP
        })
      )
    }
    return this.filesServices.saveFiles(array)
  }
}
