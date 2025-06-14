import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
