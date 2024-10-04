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

  const input = {
    quantity: 2,
    lastVehicleId: 12858
  }

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
        Results: [
          {
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
        ]
      }
    })
  })

  beforeEach(() => {
    sut = new DbTransformVehicleData(veicleNhstaApi, xmlAdapter, vehicheRepository)
  })

  it('should call LoadVehicleMakeNhstaApi', async () => {
    await sut.transform(input)
    expect(veicleNhstaApi.load).toHaveBeenCalledWith({})
  })

  it('should rethrow if LoadVehicleMakeNhstaApi throws', async () => {
    veicleNhstaApi.load.mockRejectedValueOnce(new Error('api_error'))
    const promise = sut.transform(input)
    await expect(promise).rejects.toThrow(new Error('api_error'))
  })

  it('should call XmlParser with correct value', async () => {
    await sut.transform(input)
    expect(xmlAdapter.parse).toHaveBeenNthCalledWith(1, mockMakeApi())
    expect(xmlAdapter.parse).toHaveBeenNthCalledWith(2, mockTypeApi())
    expect(xmlAdapter.parse).toHaveBeenCalledTimes(2)
  })

  it('should rethrow if XmlParser throws', async () => {
    xmlAdapter.parse.mockRejectedValueOnce(new Error('xml_error'))
    const promise = sut.transform(input)
    await expect(promise).rejects.toThrow(new Error('xml_error'))
  })

  it('should call BulkSaveVehicleDataRepository with correct value', async () => {
    await sut.transform(input)
    expect(vehicheRepository.bulk).toHaveBeenCalledWith([
      {
        id: 12859,
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
    const promise = sut.transform(input)
    await expect(promise).rejects.toThrow(new Error('repository_error'))
  })

  it('should return correct value on success', async () => {
    const result = await sut.transform(input)
    expect(result).toEqual({
      count: 2,
      message: 'Response returned successfully',
      vehicles: [
        {
          id: 12859,
          makeId: 12859,
          makeName: 'FORD',
          vehicleTypes: [
            {
              typeId: 2,
              typeName: 'Passenger Car'
            }
          ]
        }
      ]
    })
  })
})