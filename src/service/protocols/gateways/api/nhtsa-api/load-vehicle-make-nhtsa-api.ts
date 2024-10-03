export interface LoadVehicleMakeNhstaApi {
  load: (input: LoadVehicleMakeNhstaApi.Input) => Promise<LoadVehicleMakeNhstaApi.Output>
}

export namespace LoadVehicleMakeNhstaApi { 
  export type Input = {}

  export type Output = {
    makeId: string
    makeName: string
  }
}
