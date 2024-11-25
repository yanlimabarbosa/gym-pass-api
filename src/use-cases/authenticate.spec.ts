import { describe, expect, it } from 'vitest'
import { } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    const password = '123456'
    const password_hash = await hash(password, 6)

    await usersRepository.create({
      name: 'John Doe Test',
      email: 'johndoee@example.com',
      password_hash,
    })

    const { user } = await authenticateUseCase.execute({
      email: 'johndoee@example.com',
      password,
    })

    expect(user.id).toEqual('user-1')
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    const password = '123456'

    await expect(
      authenticateUseCase.execute({
        email: 'johndoee@example.com',
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe Test',
      email: 'johndoee@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      authenticateUseCase.execute({
        email: 'johndoee@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
