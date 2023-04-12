import type { LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorsCollection = await MongoHelper.getCollection('errors')
    await errorsCollection.insertOne({
      stack,
      date: new Date()
    })
    // const accountId = result.insertedId
    // const mongoAccount = await errorsCollection.findOne<AccountModel>({ _id: accountId }, {})
    // const { ...account } = mongoAccount
  }
}
