import {
  BulkSaveVehicleDataRepository,
  LoadVehicleDataRepository
} from '@/service/protocols'

import { VehicleModel } from '../../entities'
import { MongooseHelper } from '../../helpers'
import { Injectable } from '@nestjs/common'

@Injectable()
export class VehicleDataRepository
implements
BulkSaveVehicleDataRepository,
LoadVehicleDataRepository {
  async bulk (input: BulkSaveVehicleDataRepository.Input): Promise<BulkSaveVehicleDataRepository.Output> {
    const vehicle = await VehicleModel.insertMany(input)
    return !!vehicle
  }

  async load (): Promise<LoadVehicleDataRepository.Output> {
    const vehicle = await VehicleModel.find().exec()
    return MongooseHelper.mapCollection(vehicle)
  }
}
