import { TransformVehicleData } from "@/domain/usecases";
import { LoadVehicleMakeNhstaApi, LoadVehicleTypeByMakeIdNhstaApi, XmlParser } from "../protocols";
import { Vehicle } from "@/domain/models";
import { BulkSaveVehicleDataRepository } from "../protocols/repository";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class DbTransformVehicleData implements TransformVehicleData {
  constructor(
    @Inject('VehicleNhstaApi') private readonly veicleNhstaApi: LoadVehicleMakeNhstaApi & LoadVehicleTypeByMakeIdNhstaApi,
    @Inject('XmlAdapter') private readonly xmlAdapter: XmlParser,
    @Inject('VehicheRepository') private readonly vehicheRepository: BulkSaveVehicleDataRepository
  ) { }

  async transform({
    quantity,
    lastVehicleId
  }: TransformVehicleData.Input): Promise<TransformVehicleData.Output> {
    const vehicleMakes = await this.veicleNhstaApi.load({})
    if (!vehicleMakes) {
      return;
    }

    let vehicleData: Vehicle [] = []

    const result = await this.xmlAdapter.parse(vehicleMakes)

    const mappedResponse = result ? {
      count: result.Response.Count,
      message: result.Response.Message,
      vehicleMakes: result.Response.Results[0].AllVehicleMakes?.map?.(make => ({
        id: make.Make_ID,
        name: make.Make_Name,
      })) 
    } : null

    if (mappedResponse){
      const filteredVehicleMakes = mappedResponse.vehicleMakes
      .filter((make) => (lastVehicleId ? make?.id > lastVehicleId : true)) 
      .slice(0, quantity);

      for (const make of filteredVehicleMakes) {
        const vehicleTypes = await this.veicleNhstaApi.loadByMakeId({ makeId: make.id });
        if (!vehicleTypes) {
          return null;
        }
  
        const typeResult = await this.xmlAdapter.parse(vehicleTypes);
  
        vehicleData.push({
          id: make.id,
          makeId: make.id,
          makeName: make.name,
          vehicleTypes: typeResult.Response.Results[0].VehicleTypesForMakeIds?.map?.((type) => ({
            typeId: type.VehicleTypeId,
            typeName: type.VehicleTypeName,
          })),
        });
      }
    }

    await this.vehicheRepository.bulk(vehicleData)

    return {
      count: mappedResponse.count,
      message: mappedResponse.message,
      vehicles: vehicleData
    }
  }
}