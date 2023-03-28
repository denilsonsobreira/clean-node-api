import type { AccountModel } from '../../../domain/models/account'
import type { AddAccountModel, AddAccount } from '../../../domain/use-cases/add-account'
import type { Encrypter } from '../../protocols/encrypter'

export class DBAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => {
      resolve({
        id: 'string',
        name: 'string',
        email: 'string',
        password: 'string'
      })
    })
  }
}
