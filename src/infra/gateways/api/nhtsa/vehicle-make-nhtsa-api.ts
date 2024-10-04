import { LoadVehicleMakeNhstaApi, HttpClient, LoadVehicleTypeByMakeIdNhstaApi } from '@/service/protocols'
import { HttpStatusCode } from '@/domain/enums'
import { HttpError } from '@/domain/models'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class VehicleNhstaApi implements LoadVehicleMakeNhstaApi, LoadVehicleTypeByMakeIdNhstaApi {
  constructor (
    @Inject('API_BASE_URL') private readonly baseUrl: string,
    @Inject('HttpClient') private readonly httpClient: HttpClient
  ) {}

  async load (_input: LoadVehicleMakeNhstaApi.Input): Promise<LoadVehicleMakeNhstaApi.Output> {
    const { data, statusCode } = await this.httpClient.request({
      method: 'get',
      url: `${this.baseUrl}/vehicles/getallmakes?format=XML`,
    })

    switch (statusCode) {
      case HttpStatusCode.ok: return data
      case HttpStatusCode.badRequest: throw new HttpError(statusCode, data?.errors[0]?.description)
      default: throw new HttpError(statusCode, 'Something went wrong. Please try again later.')
    }
  }

  async loadByMakeId ({makeId}: LoadVehicleTypeByMakeIdNhstaApi.Input): Promise<LoadVehicleTypeByMakeIdNhstaApi.Output> {
    const { data, statusCode } = await this.httpClient.request({
      method: 'get',
      url: `${this.baseUrl}/vehicles/GetVehicleTypesForMakeId/${makeId}?format=XML`,
    })

    switch (statusCode) {
      case HttpStatusCode.ok: return data
      case HttpStatusCode.badRequest: throw new HttpError(statusCode, data?.errors[0]?.description)
      default: throw new HttpError(statusCode, 'Something went wrong. Please try again later.')
    }
  }
}
