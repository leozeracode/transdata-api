import { Module } from "@nestjs/common";
import { MigrationExtension } from "./migration-extension";
import { VehicleNhstaApi } from "@/infra/gateways/api/nhtsa";
import { XmlAdapter } from "@/infra/gateways/xml";
import { VehicleDataRepository } from "@/infra/db/mongodb";
import { DbTransformVehicleData } from "@/service/usecases";
import { AxiosHttpClient } from "@/infra/gateways/http";

@Module({
  imports: [MigrationExtensionModule],

  providers: [
    MigrationExtension, 
    {
      provide: 'TransformVehicleData', 
      useClass: DbTransformVehicleData, 
    },
    {
      provide: 'VehicleNhstaApi', 
      useClass: VehicleNhstaApi,
    },
    {
      provide: 'XmlAdapter', 
      useClass: XmlAdapter,
    },
    {
      provide: 'VehicheRepository',
      useClass: VehicleDataRepository,
    },
    {
      provide: 'HttpClient',
      useClass: AxiosHttpClient,
    },
    {
      provide: 'API_BASE_URL', 
      useValue: 'https://vpic.nhtsa.dot.gov/api/', 
    },
  ],
})
export class MigrationExtensionModule {}
