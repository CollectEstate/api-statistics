import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exec } from 'child_process';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const version: string = await new Promise((resolve) => {
    exec('npm run version --silent', (error, stdout) => {
      resolve(stdout.trim());
    });
  });

  const config = new DocumentBuilder()
    .setTitle('')
    .setDescription('')
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API Statistics - API - Docs',
    customCss: `
            .swagger-ui .topbar {
                background: rgb(3, 31, 56);
                background-position: 20px 10px;
                background-size: 150px;
            }
            
            .swagger-ui .topbar img {
                visibility: hidden;
            }
        `,
  };

  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(3002);
}
bootstrap();
