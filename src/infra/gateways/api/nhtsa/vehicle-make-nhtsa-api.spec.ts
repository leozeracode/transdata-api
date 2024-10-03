import { LoadVehicleMakeNhstaApi, HttpClient } from '@/service/protocols'
import { VehicleMakeNhstaApi } from './vehicle-make-nhtsa-api'

import { mock, MockProxy } from 'jest-mock-extended'
import {faker} from '@faker-js/faker'

describe('VehicleMakeNhstaApi', () => {
  let httpClient: MockProxy<HttpClient>
  let sut: VehicleMakeNhstaApi
  let baseUrl: string
  let input: LoadVehicleMakeNhstaApi.Input
  let data: string

  beforeAll(() => {
    data = faker.string.uuid()
    baseUrl = faker.internet.url()
    httpClient = mock()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    httpClient.request.mockResolvedValue({ data: { data }, statusCode: 200 })
    sut = new VehicleMakeNhstaApi(baseUrl, httpClient)
  })

  it('shoud call HttpClient with correct params', async () => {
    await sut.load({})

    expect(httpClient.request).toHaveBeenCalledWith({
      method: 'post',
      url:  `${baseUrl}/vehicles/getallmakes?format=XML`,
      body: {}
    })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('shoud throw if HttpClient throws', async () => {
    httpClient.request.mockRejectedValueOnce(new Error('http_error'))
    const promise = sut.load({})

    await expect(promise).rejects.toThrow()
  })

  it('shoud return a data on success', async () => {
    const result = await sut.load({})

    expect(result).toEqual({ data })
  })
})
