import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ExceptionHandlerFilter } from '@filters';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)


  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const errorMsgs = errors.map((err) =>
          Object.values(err.constraints).join(', '),
        );
        throw new BadRequestException(errorMsgs.join(' && '));
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new ExceptionHandlerFilter());

  app.use(morgan('tiny'))

  const config = new DocumentBuilder()
    .setTitle('EasyJob API')
    .setDescription('The EasyJob API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<number>('port'), () => {
    console.log(`Uraaa server ${configService.get<number>('port')} portda ishlamoqda...`);
});

}
bootstrap();