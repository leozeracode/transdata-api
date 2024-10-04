export type Vehicle = {
  id: string
  makeId: string
  makeName: string
  vehicleTypes: VehicleType[]
}

export type VehicleType = {
  typeId: string
  typeName: string
}