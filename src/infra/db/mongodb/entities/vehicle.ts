import mongoose, { Schema, Document } from 'mongoose'


export type IVehicle = Document & {
  makeId: string 
  makeName: string
  vehicleTypes: VehicleType[]
}

export type VehicleType = Document & {
  typeId: string
  typeName: string
}

const VehicleTypeSchema = new Schema({
  typeId: { type: String, required: true },
  typeName: { type: String, required: true }
})

const VehicleSchema = new Schema({
  makeId: { type: String, required: true },
  makeName: { type: String, required: true },
  vehicleTypes: [VehicleTypeSchema]
})

export const VehicleModel = mongoose.model<IVehicle>('Vehicle', VehicleSchema)