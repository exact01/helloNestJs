import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app.module'
import { disconnect, Types } from 'mongoose'
import { PatchRoomDto } from '../../src/room/dtos'
import { roomTestDto } from './constants/roomTestDto'
import { USER_1, USER_2 } from '../constants'

describe('RoomController (e2e)', () => {
  let app: INestApplication
  let roomId: string
  const randomId = new Types.ObjectId().toString()
  const errorId = 'dfklsfjlkdSjdklsFjklFdsljkdsFjlkfsDljkFdsljkfsD'
  let token: string
  let token2: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    const { body } = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({
        email: USER_1.email,
        password: USER_1.password
      })
    token = body.accessToken

    const { body: body2 } = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({
        email: USER_2.email,
        password: USER_2.password
      })
    token2 = body2.accessToken
  })

  describe('Default tests', () => {
    it('/room (POST) 403', async () => {
      await request(app.getHttpServer())
        .post('/room')
        .set('Authorization', 'Bearer ' + token)
        .send(roomTestDto)
        .expect(403)
    })

    it('/room (POST) 201', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/room')
        .set('Authorization', 'Bearer ' + token2)
        .send(roomTestDto)
        .expect(201)

      roomId = body._id
      expect(roomId).toBeDefined()
    })

    it('/room/current/:id (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/room/current/${roomId}`)
        .set('Authorization', 'Bearer ' + token)
        .send(roomTestDto)
        .expect(200)

      expect(roomId === body._id).toBe(true)
    })

    it('/room/current/:id (GET) 404', async () => {
      await request(app.getHttpServer())
        .get(`/room/current/${randomId}`)
        .set('Authorization', 'Bearer ' + token)
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
        .set('Authorization', 'Bearer ' + token2)
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
        .set('Authorization', 'Bearer ' + token2)
        .send(patchDto)
        .expect(404)
    })

    it('room/ (DELETE)', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/room')
        .set('Authorization', 'Bearer ' + token2)
        .send({ id: roomId })
        .expect(200)

      const { isDeleted } = body
      expect(isDeleted).toBe(true)
    })

    it('room/ (DELETE) 404', async () => {
      await request(app.getHttpServer())
        .delete('/room')
        .set('Authorization', 'Bearer ' + token2)
        .send({ id: randomId })
        .expect(404)
    })
  })

  describe('Validation error', () => {
    it('/room (POST) 400 validation error', async () => {
      await request(app.getHttpServer())
        .post('/room')
        .set('Authorization', 'Bearer ' + token2)
        .send({ ...roomTestDto, isSeaView: 'random' })
        .expect(400)
    })

    it('/room (POST) 400 validation error', async () => {
      await request(app.getHttpServer())
        .post('/room')
        .set('Authorization', 'Bearer ' + token2)
        .send({ ...roomTestDto, roomNumber: 0 })
        .expect(400)
    })

    it('/room (POST) 400 validation error', async () => {
      await request(app.getHttpServer())
        .post('/room')
        .set('Authorization', 'Bearer ' + token2)
        .send({ ...roomTestDto, roomType: 'random' })
        .expect(400)
    })

    it('/room (GET) 400 validation error', async () => {
      await request(app.getHttpServer())
        .get('/room/0')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
    })

    it('/room (GET) 400 validation error', async () => {
      await request(app.getHttpServer())
        .get('/room/0')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
    })

    it('/room (GET) 400 validation error', async () => {
      await request(app.getHttpServer())
        .get('/room/current/0')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
    })

    it('/room (GET) 400 validation error', async () => {
      await request(app.getHttpServer())
        .get(`/room/${errorId}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
    })

    it('/room (GET) 400 validation error', async () => {
      await request(app.getHttpServer())
        .get(`/room/current/${errorId}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
    })

    it('/room (PATCH) 400 validation error', async () => {
      await request(app.getHttpServer())
        .patch('/room')
        .set('Authorization', 'Bearer ' + token2)
        .send({ ...roomTestDto, id: 0 })
        .expect(400)
    })

    it('room/ (DELETE) 400 validation error', async () => {
      await request(app.getHttpServer())
        .delete('/room')
        .set('Authorization', 'Bearer ' + token2)
        .send({ id: 0 })
        .expect(400)
    })
  })

  afterAll(async () => {
    await disconnect()
  })
})
