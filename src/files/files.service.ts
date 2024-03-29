import { Injectable } from '@nestjs/common'
import { FileElementResponse } from './dtos'
import moment from 'moment/moment'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import sharp from 'sharp'
import { MFile } from './mfile.class'
@Injectable()
export class FilesService {
  async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
    const dateFolder = moment.utc().format('YYYY-MM-DD')
    const uploadFolder = `${path}/uploads/${dateFolder}`
    await ensureDir(uploadFolder)
    const res: FileElementResponse[] = []
    for (const file of files) {
      const fileBuffer = await sharp(file.buffer).resize(500).toBuffer()
      await writeFile(`${uploadFolder}/${file.originalname}`, fileBuffer)
      res.push({
        url: `${dateFolder}/${file.originalname}`,
        name: file.originalname
      })
    }
    return res
  }

  async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).resize(500).webp().toBuffer()
  }
}
