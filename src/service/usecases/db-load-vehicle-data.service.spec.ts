import { mock, MockProxy } from "jest-mock-extended"
import { LoadVehicleDataRepository } from "../protocols"
import { DbLoadVehicleData } from "./db-load-vehicle-data.service"
import { mockVehicleDataArray } from "../test"

describe('DbLoadVehicleDataService', () => { 
  let sut: DbLoadVehicleData
  let loadVehicleDataRepository: MockProxy<LoadVehicleDataRepository>
  const output = mockVehicleDataArray()

  beforeAll(() => {
    loadVehicleDataRepository = mock()

    loadVehicleDataRepository.load.mockResolvedValue(output)
  })

  beforeEach(() => {
    sut = new DbLoadVehicleData(loadVehicleDataRepository)
  })

  it('should call LoadVehicleDataRepository with correct values', async () => {
    await sut.load({})
    expect(loadVehicleDataRepository.load).toHaveBeenCalledWith({})
    expect(loadVehicleDataRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if LoadVehicleDataRepository throws', async () => {
    loadVehicleDataRepository.load.mockRejectedValueOnce(new Error('LoadVehicleDataRepository'))
    const promise = sut.load({})
    await expect(promise).rejects.toThrow()
  })

  it('should return an vehicle data array on success', async () => {
    const result = await sut.load({})
    expect(result).toEqual(output)
  })
  
})