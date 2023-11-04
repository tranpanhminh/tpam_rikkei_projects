import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'typeorm';
import * as session from 'express-session';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const port = process.env.SERVER_PORT;
// -----------------------------------------------
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const errorMessages = {};
        errors.forEach((error) => {
          errorMessages[error.property] =
            error.constraints[Object.keys(error.constraints)[0]];
        });
        const total = [];
        total.push(errorMessages);
        return new BadRequestException(total);
      },
      stopAtFirstError: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors(); // <- enable CORS
  // somewhere in your initialization file
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
    }),
  );
  await app.listen(port);
}
bootstrap();
