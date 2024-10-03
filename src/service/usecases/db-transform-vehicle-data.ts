import { TransformVehicleData } from "@/domain/usecases";
import { LoadVehicleMakeNhstaApi, LoadVehicleTypeByMakeIdNhstaApi, XmlParser } from "../protocols";
import { Vehicle } from "@/domain/models";
import { BulkSaveVehicleDataRepository } from "../protocols/repository";

export class DbTransformVehicleData implements TransformVehicleData {
  constructor(
    private readonly veicleNhstaApi: LoadVehicleMakeNhstaApi & LoadVehicleTypeByMakeIdNhstaApi,
    private readonly xmlAdapter: XmlParser,
    private readonly vehicheRepository: BulkSaveVehicleDataRepository
  ) { }

  async transform(input: TransformVehicleData.Input): Promise<TransformVehicleData.Output> {
    const vehicleMakes = await this.veicleNhstaApi.load({})
    if (!vehicleMakes) {
      return;
    }

    let vehicledata: Vehicle [] = []

    const result = await this.xmlAdapter.parse(vehicleMakes)

    const mappedResponse = result ? {
      count: result.Response.Count,
      message: result.Response.Message,
      vehicleMakes: result.Response.Results.AllVehicleMakes.map(make => ({
        id: make.Make_ID,
        name: make.Make_Name,
      })) 
    } : null

    if (mappedResponse){
      for(const make of mappedResponse.vehicleMakes){
        const vehicleTypes = await this.veicleNhstaApi.loadByMakeId({ makeId: make.id })
        if (!vehicleTypes) {
          return null
        }
        const result = await this.xmlAdapter.parse(vehicleTypes)
        vehicledata.push({
          makeId: make.id,
          makeName: make.name,
          vehicleTypes: result.Response.Results.VehicleTypesForMakeIds.map(type => ({
            typeId: type.VehicleTypeId,
            typeName: type.VehicleTypeName,
          }))
        })
      }
    }

    await this.vehicheRepository.bulk(vehicledata)
  }
}