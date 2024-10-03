import { faker } from "@faker-js/faker/.";

export const mockVehicleData = (): any => (  {
  makeId: faker.database.mongodbObjectId(),
  makeName: faker.vehicle.model(),
  vehicleTypes: [
      {
          typeId: faker.database.mongodbObjectId(),
          typeName: faker.vehicle.type(),
      },
      {
          typeId: faker.database.mongodbObjectId(),
          typeName: faker.vehicle.type(),
      },
  ]
})

export const mockVehicleDataArray = (): any[] => ([
  mockVehicleData(),
  mockVehicleData(),
  mockVehicleData(),
  mockVehicleData(),
])