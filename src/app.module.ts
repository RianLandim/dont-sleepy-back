import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { userModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SleepModule } from './sleep/sleep.module';

@Module({
    imports: [userModule, AuthModule, SleepModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
