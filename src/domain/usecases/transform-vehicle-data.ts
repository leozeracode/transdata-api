export interface TransformVehicleData {
  transform: (input: TransformVehicleData.Input) => TransformVehicleData.Output
}

export namespace TransformVehicleData {
  export type Input = {}

  export type Output = void
}