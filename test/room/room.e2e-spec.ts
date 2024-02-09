import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app.module'
import { disconnect, Types } from 'mongoose'
import { PatchRoomDto } from '../../src/room/dtos'
import { roomTestDto } from './constants/roomTestDto'

describe('RoomController (e2e)', () => {
  let app: INestApplication
  let roomId: string
  const randomId = new Types.ObjectId().toString()
  const errorId = 'dfklsfjlkdSjdklsFjklFdsljkdsFjlkfsDljkFdsljkfsD'

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe('Default tests', () => {
    it('/room (POST) 201', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/room')
        .send(roomTestDto)
        .expect(201)

      roomId = body._id
      expect(roomId).toBeDefined()
    })

    it('/room/current/:id (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/room/current/${roomId}`)
        .send(roomTestDto)
        .expect(200)

      expect(roomId === body._id).toBe(true)
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
        id: roomId,
        isSeaView: false
      }

      const { body } = await request(app.getHttpServer())
        .patch('/room')
        .send(patchDto)
        .expect(200)

      const { isSeaView } = body
      expect(isSeaView).toBe(false)
    })

    it('room/ (PATCH) 404', async () => {
      const patchDto: PatchRoomDto = {
        ...roomTestDto,
        id: randomId,
        isSeaView: false
      }

      await request(app.getHttpServer())
        .patch('/room')
        .send(patchDto)
        .expect(404)
    })

    it('room/ (DELETE)', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/room')
        .send({ id: roomId })
        .expect(200)

      const { isDeleted } = body
      expect(isDeleted).toBe(true)
    })

    it('room/ (DELETE) 404', async () => {
      await request(app.getHttpServer())
        .delete('/room')
        .send({ id: randomId })
        .expect(404)
    })
  })

  describe('Validation error', () => {
    it('/room (POST) 400 validation error', async () => {
      await request(app.getHttpServer())
        .post('/room')
        .send({ ...roomTestDto, isSeaView: 'random' })
        .expect(400)
    })

    it('/room (POST) 400 validation error', async () => {
      await request(app.getHttpServer())
        .post('/room')
        .send({ ...roomTestDto, roomNumber: 0 })
        .expect(400)
    })

    it('/room (POST) 400 validation error', async () => {
      await request(app.getHttpServer())
        .post('/room')
        .send({ ...roomTestDto, roomType: 'random' })
        .expect(400)
    })

    it('/room (GET) 400 validation error', async () => {
      await request(app.getHttpServer()).get('/room/0').expect(400)
    })

    it('/room (GET) 400 validation error', async () => {
      await request(app.getHttpServer()).get('/room/0').expect(400)
    })

    it('/room (GET) 400 validation error', async () => {
      await request(app.getHttpServer()).get('/room/current/0').expect(400)
    })

    it('/room (GET) 400 validation error', async () => {
      await request(app.getHttpServer()).get(`/room/${errorId}`).expect(400)
    })

    it('/room (GET) 400 validation error', async () => {
      await request(app.getHttpServer())
        .get(`/room/current/${errorId}`)
        .expect(400)
    })

    it('/room (PATCH) 400 validation error', async () => {
      await request(app.getHttpServer())
        .patch('/room')
        .send({ ...roomTestDto, id: 0 })
        .expect(400)
    })

    it('room/ (DELETE) 400 validation error', async () => {
      await request(app.getHttpServer())
        .delete('/room')
        .send({ id: 0 })
        .expect(400)
    })
  })

  afterAll(async () => {
    await disconnect()
  })
})
