import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as events from 'events';
// import passport from 'passport';
// import { useContainer } from 'typeorm';
// import * as session from 'express-session';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const port = process.env.SERVER_PORT;
const frontEndPath = process.env.FRONTEND_PATH;

// -----------------------------------------------
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: `${frontEndPath}`,
    methods: 'GET,PUT,PATCH,DELETE,POST',
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200,
  }); // <- enable CORS

  // app.use(passport.initialize());
  // app.use(passport.session());
  app.useGlobalPipes(
    new ValidationPipe({
      // exceptionFactory: (errors) => {
      //   const errorMessages = {};
      //   errors.forEach((error) => {
      //     errorMessages[error.property] =
      //       error.constraints[Object.keys(error.constraints)[0]];
      //   });
      //   const total = [];
      //   total.push(errorMessages);
      //   return new BadRequestException(total);
      // },

      exceptionFactory: (errors) => {
        const firstError = errors[0];
        const propertyName = Object.keys(firstError.constraints)[0];
        const errorMessage = firstError.constraints[propertyName];
        return new BadRequestException({
          message: errorMessage,
          error: 'Bad Request',
          statusCode: 400,
        });
      },

      stopAtFirstError: true,
    }),
  );
  // useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // somewhere in your initialization file
  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET,
  //     saveUninitialized: false,
  //   }),
  // );
  // events.setMaxListeners(Infinity); // Thêm dòng này để fix lỗi Possible EventEmitter memory leak detected
  await app.listen(port);
}
bootstrap();
