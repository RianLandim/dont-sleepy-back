import { Module } from '@nestjs/common';
import { SleepService } from './sleep.service';
import { SleepController } from './sleep.controller';
import { PrismaService } from '../prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
    controllers: [SleepController],
    providers: [SleepService, PrismaService, JwtAuthGuard],
})
export class SleepModule {}
