import mongoose, { Connection, Document, Model } from 'mongoose'

export const MongooseHelper = {
  connection: null as Connection | null,
  uri: null as string | null,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.connection = await mongoose.connect(uri)
  },

  async disconnect (): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect()
      this.connection = null
    }
  },

  getCollection<T>(name: string): Model<T & Document> {
    return mongoose.models[name] || mongoose.model<T>(name)
  },

  map: (data: any): any => {
    const { _id, ...rest } = data.toObject ? data.toObject() : data
    return { ...rest, id: _id.toString() }
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map((item) => MongooseHelper.map(item))
  },

  mapper: (document: any) => {
    const { _id, __v, ...rest } = document._doc
    return { id: _id.toHexString(), ...rest }
  }
}
