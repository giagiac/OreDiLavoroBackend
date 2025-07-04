import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import 'dotenv/config';
import { AppModule } from './app.module';
import { AllConfigType } from './config/config.type';
import { ResolvePromisesInterceptor } from './utils/serializer.interceptor';
import validationOptions from './utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
//    cors: false,
    cors: {
      origin: [
        '*',
        'https://ore-di-lavoro-frontend.vercel.app', // <--- Sostituisci con l'URL esatto della tua app Vercel
        'https://test.erroridiconiazione.com',
        'http://192.168.5.110:3002', // Aggiungi qui altre origini se necessario (es. per sviluppo locale)
        'http://192.168.5.110:3001', // Aggiungi qui altre origini se necessario (es. per sviluppo locale)
        'https://ore.rmponterosso.it/',
        'http://localhost:3000', // Aggiungi qui altre origini se necessario (es. per sviluppo locale)
        'http://localhost:3001', // Aggiungi qui altre origini se necessario (es. per sviluppo locale)
        'http://localhost:3002', // Aggiungi
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Specifica i metodi consentiti
      allowedHeaders: 'Content-Type,Accept,Authorization,x-custom-lang', // Specifica gli header consentiti
      credentials: true, // <-- MOLTO IMPORTANTE se usi cookie o header Authorization
    },
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<AllConfigType>);

  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', { infer: true }), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    new ResolvePromisesInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  const options = new DocumentBuilder().setTitle('API').setDescription('API docs').setVersion('1.0').addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
void bootstrap();
