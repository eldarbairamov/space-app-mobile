require( "module-alias/register" );
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { STATIC_PATH } from "./common/constants";
import configuration from "./config/configuration";

const start = async () => {
   const app = await NestFactory.create<NestExpressApplication>( AppModule );

   app.useGlobalPipes( new ValidationPipe( { transform: true, transformOptions: { enableImplicitConversion: true } } ) );
   app.useStaticAssets( STATIC_PATH );
   app.enableCors();

   await app.listen( configuration().PORT );
};

start().then( () => console.log( `Server started on port ${ configuration().PORT }` ) );
