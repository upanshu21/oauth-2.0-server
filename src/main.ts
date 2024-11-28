import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Add this line
  app.enableCors(); // Add this line
  await app.listen(3001);
}
bootstrap();

