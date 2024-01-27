import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { disconnect, Types } from 'mongoose'
import { roomTestDto } from '../room/constants/roomTestDto'
import { PostScheduleDto } from '../../src/schedule/dtos'

describe('ScheduleController (e2e)', () => {
  let app: INestApplication
  let roomId: string = ''
  let scheduleId: string = ''
  const randomId = new Types.ObjectId().toString()
  const testDto: PostScheduleDto = { day: 1, room_id: roomId }

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
      testDto.day = 1
      testDto.room_id = roomId

      expect(roomId).toBeDefined()
    })

    it('/schedule (GET) 200', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/schedule')
        .send(roomTestDto)
        .expect(200)

      expect(Array.isArray(body)).toBe(true)
    })

    it('/schedule/:id (GET) 404', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/schedule/${randomId}`)
        .expect(404)

      expect(body.error).toBe('Not Found')
    })

    it('schedule/ (POST) 201', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/schedule')
        .send(testDto)
        .expect(201)

      scheduleId = body._id
      expect(body._id).toBeDefined()
    })

    it('/schedule/:id (GET) 200', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/schedule/${scheduleId}`)
        .expect(200)

      expect(body._id).toBe(scheduleId)
      expect(body.day).toBe(testDto.day)
      expect(body.room_id).toBe(testDto.room_id)
    })

    it('/schedule (PATCH) 404', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/schedule')
        .send({ ...testDto, id: randomId })
        .expect(404)

      expect(body.error).toBe('Not Found')
    })

    it('/schedule (PATCH) 404', async () => {
      const { body } = await request(app.getHttpServer())
        .patch('/schedule')
        .send({ ...testDto, id: randomId })
        .expect(404)

      expect(body.error).toBe('Not Found')
    })

    it('/schedule (PATCH) 200', async () => {
      const { body } = await request(app.getHttpServer())
        .patch('/schedule')
        .send({ ...testDto, id: scheduleId, day: 2 })
        .expect(200)

      expect(body.day).toBe(2)
    })

    it('/schedule (DELETE) 404', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/schedule')
        .send({ id: randomId })
        .expect(404)

      expect(body.error).toBe('Not Found')
    })

    it('/schedule (DELETE) 200', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/schedule')
        .send({ id: scheduleId })
        .expect(200)

      expect(body.message).toBeDefined()
    })

    it('/room (DELETE) 200', async () => {
      await request(app.getHttpServer())
        .delete('/room')
        .send({ id: roomId })
        .expect(200)
    })
  })

  describe('Validation errors', () => {
    it('/schedule/:id (GET) 400 validation error', async () => {
      await request(app.getHttpServer()).get('/schedule/0').expect(400)
    })

    it('schedule/ (POST) 400 validation error', async () => {
      await request(app.getHttpServer())
        .post('/schedule')
        .send({ room_id: randomId, day: 'text' })
        .expect(400)
    })

    it('schedule/ (POST) 400 validation error', async () => {
      await request(app.getHttpServer())
        .post('/schedule')
        .send({ room_id: 'text', day: 1 })
        .expect(400)
    })

    it('schedule/ (PATCH) 400 validation error', async () => {
      await request(app.getHttpServer())
        .patch('/schedule')
        .send({ room_id: randomId, day: 1, id: 'text' })
        .expect(400)
    })

    it('schedule/ (DELETE) 400 validation error', async () => {
      await request(app.getHttpServer())
        .delete('/schedule')
        .send({ id: 'text' })
        .expect(400)
    })
  })

  afterAll(async () => {
    await disconnect()
  })
})
