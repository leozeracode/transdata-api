// src/vehicle/vehicle.module.ts
import { Module } from '@nestjs/common';
import { VehicleResolver } from './vehicle.resolver';
import { DbLoadVehicleData } from '@/service/usecases';
import { VehicleDataRepository } from '@/infra/db/mongodb';

@Module({
  imports: [VehicleModule],

  providers: [
    VehicleResolver, 
    { provide: 'LoadVehicleData', useClass: DbLoadVehicleData },
    { provide: 'VehicheRepository', useClass: VehicleDataRepository },
  ],
})
export class VehicleModule {}
