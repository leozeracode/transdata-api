import { Vehicle } from "@/domain/models"

export interface BulkSaveVehicleDataRepository {
  bulk: (data: BulkSaveVehicleDataRepository.Input) => Promise<BulkSaveVehicleDataRepository.Output>
}

export namespace BulkSaveVehicleDataRepository {
  export type Input = Vehicle[]

  export type Output = boolean
}