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
    lastVehicleMakeId
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
      .filter((make) => (lastVehicleMakeId ? Number(make?.id?.[0]) > lastVehicleMakeId : true)) 
      .slice(0, quantity);

      for (const make of filteredVehicleMakes) {
        const id = make.id[0]
        const name = make.name[0]
        if (!id || !name) {
          continue;
        }
        const vehicleTypes = await this.veicleNhstaApi.loadByMakeId({ makeId: id });
        if (!vehicleTypes) {
          return null;
        }
  
        const typeResult = await this.xmlAdapter.parse(vehicleTypes);
  
        vehicleData.push({
          id: id,
          makeId: id,
          makeName: name,
          vehicleTypes: typeResult.Response.Results[0].VehicleTypesForMakeIds?.map?.((type) => ({
            typeId: type.VehicleTypeId[0],
            typeName: type.VehicleTypeName[0],
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