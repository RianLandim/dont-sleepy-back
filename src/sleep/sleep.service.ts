import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Sleep } from 'generated/prisma';

@Injectable()
export class SleepService {
    constructor(private prisma: PrismaService) {}

    async createSleep(data: {
        start: Date;
        end: Date;
        userId: number;
    }): Promise<Sleep> {
        const startDate = new Date(data.start);
        const endDate = new Date(data.end);
        const duration = Math.floor(
            (endDate.getTime() - startDate.getTime()) / 1000,
        ); // duração em segundos
        return this.prisma.sleep.create({
            data: {
                start: startDate,
                end: endDate,
                duration,
                userId: data.userId,
            },
        });
    }

    async getUserSleeps(userId: number): Promise<Sleep[]> {
        return this.prisma.sleep.findMany({ where: { userId } });
    }

    async getSleepById(id: number, userId: number): Promise<Sleep | null> {
        return this.prisma.sleep.findFirst({ where: { id, userId } });
    }

    async updateSleep(
        id: number,
        userId: number,
        data: { start?: Date; end?: Date },
    ): Promise<Sleep | null> {
        const sleep = await this.getSleepById(id, userId);
        if (!sleep) return null;
        const startDate = data.start ? new Date(data.start) : sleep.start;
        const endDate = data.end ? new Date(data.end) : sleep.end;
        const duration = Math.floor(
            (endDate.getTime() - startDate.getTime()) / 1000,
        );
        return this.prisma.sleep.update({
            where: { id },
            data: { start: startDate, end: endDate, duration },
        });
    }

    async deleteSleep(id: number, userId: number): Promise<Sleep | null> {
        const sleep = await this.getSleepById(id, userId);
        if (!sleep) return null;
        return this.prisma.sleep.delete({ where: { id } });
    }
}
