import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VehicleType {
  @Field()
  typeId: string;

  @Field()
  typeName: string;
}

@ObjectType()
export class Vehicle {
  @Field()
  id: string;

  @Field()
  makeId: string;

  @Field()
  makeName: string;

  @Field(() => [VehicleType])
  vehicleTypes: VehicleType[];
}
