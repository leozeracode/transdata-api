import { mock, MockProxy } from "jest-mock-extended"
import { LoadVehicleMakeNhstaApi, LoadVehicleTypeByMakeIdNhstaApi, XmlParser } from "../protocols"
import { DbTransformVehicleData } from "./db-transform-vehicle-data.service"
import { mockMakeApi, mockTypeApi } from "../test"
import { BulkSaveVehicleDataRepository } from "../protocols/repository"

describe('DbTransformVehicleData', () => {
  let sut: DbTransformVehicleData
  let veicleNhstaApi: MockProxy<LoadVehicleMakeNhstaApi & LoadVehicleTypeByMakeIdNhstaApi>
  let vehicheRepository: MockProxy<BulkSaveVehicleDataRepository>
  let xmlAdapter: MockProxy<XmlParser>

  beforeAll(() => {
    veicleNhstaApi = mock()
    xmlAdapter = mock()
    vehicheRepository = mock()

    veicleNhstaApi.load.mockResolvedValue(mockMakeApi())
    veicleNhstaApi.loadByMakeId.mockResolvedValue(mockTypeApi())
    vehicheRepository.bulk.mockResolvedValue(true)

    xmlAdapter.parse.mockResolvedValue({
      Response: {
        Count: 2,
        Message: 'Response returned successfully',
        Results: {
          AllVehicleMakes: [
            {
              Make_ID: 12858,
              Make_Name: '#1 ALPINE CUSTOMS'
            },
            {
              Make_ID: 12859,
              Make_Name: 'FORD'
            }
          ],
          VehicleTypesForMakeIds: [
            {
              VehicleTypeId: 2,
              VehicleTypeName: 'Passenger Car'
            }
          ]
        }
      }
    })
  })

  beforeEach(() => {
    sut = new DbTransformVehicleData(veicleNhstaApi, xmlAdapter, vehicheRepository)
  })

  it('should call LoadVehicleMakeNhstaApi', async () => {
    await sut.transform({})
    expect(veicleNhstaApi.load).toHaveBeenCalledWith({})
  })

  it('should rethrow if LoadVehicleMakeNhstaApi throws', async () => {
    veicleNhstaApi.load.mockRejectedValueOnce(new Error('api_error'))
    const promise = sut.transform({})
    await expect(promise).rejects.toThrow(new Error('api_error'))
  })

  it('should call XmlParser with correct value', async () => {
    await sut.transform({})
    expect(xmlAdapter.parse).toHaveBeenNthCalledWith(1, mockMakeApi())
    expect(xmlAdapter.parse).toHaveBeenNthCalledWith(2, mockTypeApi())
    expect(xmlAdapter.parse).toHaveBeenCalledTimes(3)
  })

  it('should rethrow if XmlParser throws', async () => {
    xmlAdapter.parse.mockRejectedValueOnce(new Error('xml_error'))
    const promise = sut.transform({})
    await expect(promise).rejects.toThrow(new Error('xml_error'))
  })

  it('should call BulkSaveVehicleDataRepository with correct value', async () => {
    await sut.transform({})
    expect(vehicheRepository.bulk).toHaveBeenCalledWith([
      {
        makeId: 12858,
        makeName: '#1 ALPINE CUSTOMS',
        vehicleTypes: [
          {
            typeId: 2,
            typeName: 'Passenger Car'
          }
        ]
      },
      {
        makeId: 12859,
        makeName: 'FORD',
        vehicleTypes: [
          {
            typeId: 2,
            typeName: 'Passenger Car'
          }
        ]
      }
    ])
  })

  it('should rethrow if BulkSaveVehicleDataRepository throws', async () => {
    vehicheRepository.bulk.mockRejectedValueOnce(new Error('repository_error'))
    const promise = sut.transform({})
    await expect(promise).rejects.toThrow(new Error('repository_error'))
  })
})