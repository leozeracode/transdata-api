import { MongooseHelper } from '../../helpers'
import { mockVehiclesArray } from '@/infra/test'
import { VehicleDataRepository } from './vehicle-data-repository'
import { VehicleModel } from '../../entities'

const makeSut = (): VehicleDataRepository => {
  return new VehicleDataRepository()
}

describe('VehicleDataRepository', () => {
  const collection = VehicleModel

  beforeAll(async () => {
    await MongooseHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  beforeEach(async () => {
    await collection.deleteMany({})
  })

  describe('add()', () => {
    it('should return an property on success', async () => {
      const sut = makeSut()
      const data = await sut.bulk(mockVehiclesArray())
      expect(data).toBeTruthy()
    })
  })

  describe('load()', () => {
    it('should return a list of properties on success', async () => {
      const sut = makeSut()
      await collection.insertMany(mockVehiclesArray())
      const  items  = await sut.load()
      expect(items).toHaveLength(4)
    })

    it('should return a list of properties on success', async () => {
      const sut = makeSut()
      const  items  = await sut.load()
      expect(items).toHaveLength(0)
    })
  })
})
