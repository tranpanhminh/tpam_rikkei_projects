import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'typeorm';
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
  await app.listen(port);
}
bootstrap();
