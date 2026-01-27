import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global Validation for all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //strips properites that do not have decorates
      forbidNonWhitelisted: true, //throw an error if non-whiteList properites are presents
      transform: true, //transform payload to DTO instance and converts types
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();
