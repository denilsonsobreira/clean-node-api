import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const salt = 12
const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(salt)
  return sut
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hashed_value') })
  }
}))

describe('Bcrypt adapter', () => {
  test('Should call bcrypt adapter with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should returns a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('Should throw if Bcrypt throws', async () => {
    const sut = makeSut()

    // jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
