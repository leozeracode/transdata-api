import { HttpClient, HttpRequest, HttpResponse } from '@/service/protocols'
import { Injectable } from '@nestjs/common'
import axios, { AxiosResponse } from 'axios'

@Injectable()
export class AxiosHttpClient implements HttpClient {
  constructor () {}
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        auth: data.auth,
        data: data.body,
        headers: {
          ...data.headers,
        },
        params: data.params
      })

      return {
        statusCode: axiosResponse?.status,
        data: axiosResponse?.data
      }
    } catch (error) {
      return {
        statusCode: error?.response?.status,
        data: error?.response?.data
      }
    }
  }
}
