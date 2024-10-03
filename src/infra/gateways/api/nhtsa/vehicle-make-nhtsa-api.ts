import { LoadVehicleMakeNhstaApi, HttpClient } from '@/service/protocols'
import { HttpStatusCode } from '@/domain/enums'
import { HttpError } from '@/domain/models'

export class VehicleMakeNhstaApi implements LoadVehicleMakeNhstaApi {
  constructor (
    private readonly baseUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  async load (input: LoadVehicleMakeNhstaApi.Input): Promise<LoadVehicleMakeNhstaApi.Output> {
    const { data, statusCode } = await this.httpClient.request({
      method: 'post',
      url: `${this.baseUrl}/vehicles/getallmakes?format=XML`,
      body: input
    })

    switch (statusCode) {
      case HttpStatusCode.ok: return data
      case HttpStatusCode.badRequest: throw new HttpError(statusCode, data?.errors[0]?.description)
      default: throw new HttpError(statusCode, 'Something went wrong. Please try again later.')
    }
  }
}
