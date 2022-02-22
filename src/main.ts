import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import xmlparser from 'express-xml-bodyparser';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(xmlparser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.port);
}
bootstrap();
