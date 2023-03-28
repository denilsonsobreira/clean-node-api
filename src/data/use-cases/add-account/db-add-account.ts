import type { AddAccountModel, AddAccount, AccountModel, Encrypter } from './db-add-account-protocols'

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
