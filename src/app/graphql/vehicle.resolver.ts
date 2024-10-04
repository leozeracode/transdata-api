import { Resolver, Query } from '@nestjs/graphql';
import { Vehicle } from './vehicle.graphql';
import { LoadVehicleData } from '@/domain/usecases';
import { Inject } from '@nestjs/common';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(@Inject('LoadVehicleData') private readonly loadVehicleData: LoadVehicleData) {}
  @Query(() => [Vehicle])
  async vehicles(): Promise<Vehicle[]> {
    return await this.loadVehicleData.load({})
  }
}