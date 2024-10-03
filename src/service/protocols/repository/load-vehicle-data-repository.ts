import { Vehicle } from "@/domain/models"

export interface LoadVehicleDataRepository {
  load: (data: LoadVehicleDataRepository.Input) => Promise<LoadVehicleDataRepository.Output>
}

export namespace LoadVehicleDataRepository {
  export type Input = {}

  export type Output = Vehicle[]
}