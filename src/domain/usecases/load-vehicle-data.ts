import { Vehicle } from "../models"

export interface LoadVehicleData {
  load: (input: LoadVehicleData.Input) => Promise<LoadVehicleData.Output>
}

export namespace LoadVehicleData {
  export type Input = {}

  export type Output = Vehicle[]
}