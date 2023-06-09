import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountModel } from '../../../../domain/use-cases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const accountId = result.insertedId
    const mongoAccount = await accountCollection.findOne<AccountModel>({ _id: accountId }, {})
    const { ...account } = mongoAccount
    // Object.assign({}, account, { id: accountId.toString() }) // fazer com object.assign
    return {
      id: accountId.toString(),
      name: account.name,
      email: account.email,
      password: account.password
    }
  }
}
