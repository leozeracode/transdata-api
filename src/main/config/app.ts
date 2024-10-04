import { AppModule } from '@/app.module'
import setupMiddlewares from '@/main/config/middlewares'
import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

export const setupApp = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule)
  setupMiddlewares(app)
  app.setGlobalPrefix('api/v1')
  return app
}
