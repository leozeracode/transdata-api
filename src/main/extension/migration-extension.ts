import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { VehicleModel } from '@/infra/db/mongodb/entities';
import { DbTransformVehicleData } from '@/service/usecases';

@Injectable()
export class MigrationExtension implements OnModuleInit {
  private readonly logger = new Logger(MigrationExtension.name);

  constructor(
    @Inject('TransformVehicleData') private readonly service: DbTransformVehicleData
  ) {}

  async onModuleInit() {
    await this.runMigrations();
  }

  public async runMigrations() {
    try {
      this.logger.log('Running migrations...');
      await this.seedVehicleData();
      this.logger.log('Migrations completed successfully.');
    } catch (error) {
      this.logger.error('Error running migrations', error);
    }
  }

  private async seedVehicleData() {
    const vehicleCount = await VehicleModel.countDocuments();
    if (vehicleCount === 0) {
      this.logger.log('Seeding initial Vehicle data...');
      await this.service.transform({});
      this.logger.log('Seeding completed.');
    } else {
      this.logger.log('Skipping seeding. Vehicle data already exists.');
    }
  }
}
