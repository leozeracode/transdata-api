import { faker } from "@faker-js/faker/.";

export const mockVehicle = (): any => (  {
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

export const mockVehiclesArray = (): any[] => ([
  mockVehicle(),
  mockVehicle(),
  mockVehicle(),
  mockVehicle(),
])