import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { disconnect, Types } from 'mongoose'
import { PatchRoomDto } from '../src/room/dtos'
import { roomTestDto } from './constants/room/roomTestDto'

describe('RoomController (e2e)', () => {
  let app: INestApplication
  let romId: string
  const randomId = new Types.ObjectId().toString()

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/room (POST)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/room')
      .send(roomTestDto)
      .expect(201)

    romId = body._id
    expect(romId).toBeDefined()
  })

  it('/room (POST) 409', async () => {
    await request(app.getHttpServer())
      .post('/room')
      .send(roomTestDto)
      .expect(409)
  })

  it('/room/current/:id (GET)', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/room/current/${romId}`)
      .send(roomTestDto)
      .expect(200)

    expect(romId === body._id).toBe(true)
  })

  it('/room/current/:id (GET) 404', async () => {
    await request(app.getHttpServer())
      .get(`/room/current/${randomId}`)
      .send(roomTestDto)
      .expect(404)
  })

  it('room/ (PATCH)', async () => {
    const patchDto: PatchRoomDto = {
      ...roomTestDto,
      id: romId,
      is_sea_view: false
    }

    const { body } = await request(app.getHttpServer())
      .patch('/room')
      .send(patchDto)
      .expect(200)

    const { is_sea_view } = body
    expect(is_sea_view).toBe(false)
  })

  it('room/ (PATCH) 404', async () => {
    const patchDto: PatchRoomDto = {
      ...roomTestDto,
      id: randomId,
      is_sea_view: false
    }

    await request(app.getHttpServer()).patch('/room').send(patchDto).expect(404)
  })

  it('room/ (DELETE)', async () => {
    const { body } = await request(app.getHttpServer())
      .delete('/room')
      .send({ id: romId })
      .expect(200)

    const { message } = body
    expect(message).toBeDefined()
  })

  it('room/ (DELETE) 404', async () => {
    await request(app.getHttpServer())
      .delete('/room')
      .send({ id: randomId })
      .expect(404)
  })

  afterAll(async () => {
    await disconnect()
  })
})
