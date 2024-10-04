import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { MongooseHelper } from '@/infra/db/mongodb/helpers';
import { VehicleModel } from '@/infra/db/mongodb/entities';
import { AppModule } from '@/app.module'; 
import { mockVehiclesArray } from '@/infra/test';
describe('VehicleData (e2e)', () => {
  let app: INestApplication;
  const collection = VehicleModel;

  beforeAll(async () => {
    // Conecta ao MongoDB antes de iniciar os testes
    await MongooseHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongooseHelper.disconnect();
    await app.close(); 
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], 
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await collection.deleteMany({});
  });

  describe('/graphql POST', () => {
    it('should return 200 on successful vehicle query', async () => {
      await collection.insertMany(mockVehiclesArray())
      const response = await request(app.getHttpServer())
        .post('/graphql') 
        .send({
          query: `
            query {
              vehicles {
                id
                makeId
                makeName
                vehicleTypes {
                  typeId
                  typeName
                }
              }
            }`,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('vehicles');
      expect(Array.isArray(response.body.data.vehicles)).toBe(true);
    });
  });
});
