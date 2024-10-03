import { mockHttpResponse } from '@/infra/test'
import { AxiosHttpClient } from './axios-http-client'
import { mockHttpRequest } from '@/domain/test'
import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let fakeAxios: jest.Mocked<typeof axios>

  beforeAll(() => {
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.request.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })
  it('Should call axios with correct values', async () => {
    const request = mockHttpRequest()
    await sut.request(request)
    expect(fakeAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: {
        ...request.headers
      },
      method: request.method
    })
  })

  it('Should return correct response', async () => {
    const httpResponse = await sut.request(mockHttpRequest())
    const axiosResponse = await fakeAxios.request.mock.results[0].value
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      data: axiosResponse.data
    })
  })

  it('Should return correct error', () => {
    fakeAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const promise = sut.request(mockHttpRequest())
    expect(promise).toEqual(fakeAxios.request.mock.results[0].value)
  })
})
