import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { VehicleModule } from './app/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true, 
      driver: ApolloDriver, 
    }),
    VehicleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
