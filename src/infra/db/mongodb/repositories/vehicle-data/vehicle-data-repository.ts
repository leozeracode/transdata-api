import {
  BulkSaveVehicleDataRepository
} from '@/service/protocols'

import { VehicleModel } from '../../entities'

export class VehicleDataRepository
implements
BulkSaveVehicleDataRepository {
  async bulk (input: BulkSaveVehicleDataRepository.Input): Promise<BulkSaveVehicleDataRepository.Output> {
    const vehicle = await VehicleModel.insertMany(input)
    return !!vehicle
  }
}
