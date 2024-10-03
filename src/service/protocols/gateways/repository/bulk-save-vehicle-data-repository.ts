import { Vehicle } from "@/domain/models"

export interface BulkSaveVehicleDataRepository {
  bulk: (data: BulkSaveVehicleDataRepository.Params) => Promise<BulkSaveVehicleDataRepository.Result>
}

export namespace BulkSaveVehicleDataRepository {
  export type Params = Vehicle[]

  export type Result = boolean
}