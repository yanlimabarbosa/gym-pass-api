import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.ready()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'gym-01',
        description: 'Some description',
        phone: '24142152',
        latitude: -19.0075208,
        longitude: -40.5268179,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'gym-02',
        description: 'Some description',
        phone: '24142152',
        latitude: -39.0075208,
        longitude: -60.5268179,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -19.0075208, longitude: -40.5268179 })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'gym-01',
      }),
    ])
  })
})
