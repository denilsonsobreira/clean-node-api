import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,
  async connect (uri: string): Promise<void> {
    // const globalAny: any = global
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.close()
    }
    this.client = null as any
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client || this.client === null) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  findOne (id: string): any {
    return this.client.db().collection('accounts').findOne({})
  }
}
