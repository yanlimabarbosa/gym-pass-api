import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      name: 'Near Gym',
      description: null,
      phone: null,
      latitude: -19.0075208,
      longitude: -40.5268179,
    })

    await gymsRepository.create({
      name: 'Far Gym',
      description: null,
      phone: null,
      latitude: -39.0075208,
      longitude: -60.5268179,
    })

    const { gyms } = await sut.execute({
      userLatitude: -19.0075208,
      userLongitude: -40.5268179,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym' })])
  })

  // it('should be able to fetch paginated gyms search', async () => {
  //   for (let i = 1; i <= 22; i++) {
  //     await gymsRepository.create({
  //       name: `gym-${i}`,
  //       description: null,
  //       phone: null,
  //       latitude: 0,
  //       longitude: 0,
  //     })
  //   }

  //   const { gyms } = await sut.execute({
  //     query: 'gym',
  //     page: 2,
  //   })

  //   expect(gyms).toHaveLength(2)
  //   expect(gyms).toEqual([
  //     expect.objectContaining({ name: 'gym-21' }),
  //     expect.objectContaining({ name: 'gym-22' }),
  //   ])
  // })
})
