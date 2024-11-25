import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const password = '123456'
    const password_hash = await hash(password, 6)

    await usersRepository.create({
      name: 'John Doe Test',
      email: 'johndoee@example.com',
      password_hash,
    })

    const { user } = await sut.execute({
      email: 'johndoee@example.com',
      password,
    })

    expect(user.id).toEqual('user-1')
  })

  it('should not be able to authenticate with wrong email', async () => {
    const password = '123456'

    await expect(
      sut.execute({
        email: 'johndoee@example.com',
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe Test',
      email: 'johndoee@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        email: 'johndoee@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
