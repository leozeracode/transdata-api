import { LoadVehicleData } from "@/domain/usecases";
import { LoadVehicleDataRepository } from "../protocols";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class DbLoadVehicleData implements LoadVehicleData {
  constructor(@Inject('VehicheRepository')  private readonly loadVehicleDataRepository: LoadVehicleDataRepository) {}
  async load (input: LoadVehicleData.Input): Promise<LoadVehicleData.Output> {
    return await this.loadVehicleDataRepository.load(input)
  }
}