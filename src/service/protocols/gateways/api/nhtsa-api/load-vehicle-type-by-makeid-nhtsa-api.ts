export interface LoadVehicleTypeByMakeIdNhstaApi {
  loadByMakeId: (input: LoadVehicleTypeByMakeIdNhstaApi.Input) => Promise<LoadVehicleTypeByMakeIdNhstaApi.Output>
}

export namespace LoadVehicleTypeByMakeIdNhstaApi { 
  export type Input = {
    makeId: string
  }

  export type Output = {
    makeId: string
    makeName: string
  }
}
