import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableVersioning({type:VersioningType.URI})
  app.enableCors();


  const config = new DocumentBuilder()
    .setTitle('Admin Cosole API Documentation')
    .setDescription('These APIs are used for Network Team Admin Console Application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name is important, it links to @ApiBearerAuth()
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
    fs.writeFileSync('src/swagger-spec.json', JSON.stringify(document));

    SwaggerModule.setup('sbbv2/api/explore', app, document);

  app.useGlobalPipes(new ValidationPipe({whitelist:true, transform:true}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
