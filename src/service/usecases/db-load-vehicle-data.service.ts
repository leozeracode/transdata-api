import { LoadVehicleData } from "@/domain/usecases";
import { LoadVehicleDataRepository } from "../protocols";

export class DbLoadVehicleData implements LoadVehicleData {
  constructor(private readonly loadVehicleDataRepository: LoadVehicleDataRepository) {}
  async load (input: LoadVehicleData.Input): Promise<LoadVehicleData.Output> {
    return await this.loadVehicleDataRepository.load(input)
  }
}