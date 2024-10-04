import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { VehicleModule } from './app/graphql';
import { MigrationExtensionModule } from './main/extension';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true, 
      driver: ApolloDriver, 
    }),
    VehicleModule,
    MigrationExtensionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
