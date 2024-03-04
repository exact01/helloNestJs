import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app.module'
import { disconnect, Types } from 'mongoose'
import { roomTestDto } from '../room/constants/roomTestDto'
import { PostScheduleDto } from '../../src/schedule/dtos'
import { ScheduleErrors } from '../../src/schedule/constants/errors'
import { USER_1, USER_2 } from '../constants'

describe('ScheduleController (e2e)', () => {
  let app: INestApplication
  let roomId: string = ''
  let scheduleId: string = ''
  const randomId = new Types.ObjectId().toString()
  const newStartDay = '2111-02-04T00:00:00.000Z'
  const testDto: PostScheduleDto = {
    startDay: '2111-02-03T00:00:00.000Z',
    endDay: '2111-02-06T00:00:00.000Z',
    roomId: roomId
  }
  let token = ''
  let token2 = ''

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
    it('/room (POST) 201', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/room')
        .set('Authorization', 'Bearer ' + token2)
        .send(roomTestDto)
        .expect(201)

      roomId = body._id
      testDto.roomId = roomId

      expect(roomId).toBeDefined()
    })

    it('/schedule (GET) 200', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/schedule')
        .set('Authorization', 'Bearer ' + token)
        .send(roomTestDto)
        .expect(200)

      expect(Array.isArray(body)).toBe(true)
    })

    it('/schedule/:id (GET) 404', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/schedule/${randomId}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(404)
      expect(body.message).toBeDefined()
    })

    it('schedule/ (POST) 201', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/schedule')
        .set('Authorization', 'Bearer ' + token)
        .send(testDto)
        .expect(201)

      scheduleId = body._id
      expect(body._id).toBeDefined()
    })

    it('/schedule/:id (GET) 200', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/schedule/${scheduleId}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)

      expect(body._id).toBe(scheduleId)
      expect(body.startDay).toBe(testDto.startDay)
      expect(body.roomId).toBe(testDto.roomId)
    })

    it('/schedule (PATCH) 404', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/schedule')
        .set('Authorization', 'Bearer ' + token)
        .send({ ...testDto, id: randomId })
        .expect(404)

      expect(body.message).toBe(ScheduleErrors.SCHEDULE_NOT_FOUND.message)
    })

    it('/schedule (PATCH) 200', async () => {
      const { body } = await request(app.getHttpServer())
        .patch('/schedule')
        .set('Authorization', 'Bearer ' + token)
        .send({
          ...testDto,
          id: scheduleId,
          startDay: newStartDay
        })
      expect(body.startDay).toBe(newStartDay)
    })

    it('/schedule (DELETE) 404', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/schedule')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: randomId })
        .expect(404)
      expect(body.message).toBe(ScheduleErrors.SCHEDULE_NOT_FOUND.message)
    })

    it('/schedule (DELETE) 200', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/schedule')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: scheduleId })
        .expect(200)

      expect(body.isDeleted).toBe(true)
    })

    it('/room (DELETE) 200', async () => {
      await request(app.getHttpServer())
        .delete('/room')
        .set('Authorization', 'Bearer ' + token2)
        .send({ id: roomId })
        .expect(200)
    })
  })

  describe('Validation errors', () => {
    it('/schedule/:id (GET) 400 validation error', async () => {
      await request(app.getHttpServer())
        .get('/schedule/0')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
    })

    it('schedule/ (POST) 400 validation error', async () => {
      await request(app.getHttpServer())
        .post('/schedule')
        .set('Authorization', 'Bearer ' + token)
        .send({ roomId: randomId, startDay: 'text' })
        .expect(400)
    })

    it('schedule/ (POST) 400 validation error', async () => {
      await request(app.getHttpServer())
        .post('/schedule')
        .set('Authorization', 'Bearer ' + token)
        .send({ roomId: 'text', endDay: 1 })
        .expect(400)
    })

    it('schedule/ (PATCH) 400 validation error', async () => {
      await request(app.getHttpServer())
        .patch('/schedule')
        .set('Authorization', 'Bearer ' + token)
        .send({ roomId: randomId, startDay: 1, endDay: 1, id: 'text' })
        .expect(400)
    })

    it('schedule/ (DELETE) 400 validation error', async () => {
      await request(app.getHttpServer())
        .delete('/schedule')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: 'text' })
        .expect(400)
    })
  })

  afterAll(async () => {
    await disconnect()
  })
})
