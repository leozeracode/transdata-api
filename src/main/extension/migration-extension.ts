import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import schedule from 'node-schedule'
import { VehicleModel } from '@/infra/db/mongodb/entities';
import { DbTransformVehicleData } from '@/service/usecases';

@Injectable()
export class MigrationExtension implements OnModuleInit {
  private readonly logger = new Logger(MigrationExtension.name);

  constructor(
    @Inject('TransformVehicleData') private readonly service: DbTransformVehicleData
  ) {}

  async onModuleInit() {
    if (process.env.NODE_ENV === 'test') {
      this.logger.log('Seed is disabled in test environment.');
      return;
    }
    
    await this.runMigrations();

    schedule.scheduleJob('*/10 * * * *', async () => {
      this.logger.log('Running scheduled migration...');
      await this.runMigrations();
    });
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
    try {
      const lastVehicle = await VehicleModel.findOne().sort({ makeId: -1 }).exec();
      const lastVehicleId = lastVehicle ? lastVehicle.makeId : null;

      await this.service.transform({
        quantity: Number(process.env.VEHICLE_DATA_QUANTITY),
        lastVehicleMakeId: Number(lastVehicleId),
      });

      this.logger.log('Seeding completed successfully.');
    } catch (error) {
      this.logger.error('Error during seeding', error);
    }
  }
}