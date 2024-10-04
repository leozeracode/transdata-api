import { Vehicle } from "../models"

export interface TransformVehicleData {
  transform: (input: TransformVehicleData.Input) => Promise<TransformVehicleData.Output>
}

export namespace TransformVehicleData {
  export type Input = {
    quantity?: number
    lastVehicleMakeId?: number    
  }

  export type Output = {
    count: number
    message: string
    vehicles: Vehicle[]
  }
}