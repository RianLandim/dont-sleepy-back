import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards,
    Request,
    Query,
} from '@nestjs/common';
import { SleepService } from './sleep.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('sleep')
export class SleepController {
    constructor(private readonly sleepService: SleepService) {}

    @Post()
    async createSleep(
        @Body() body: { start: Date; end: Date },
        @Request() req,
    ) {
        const userId = req.user.userId;
        return this.sleepService.createSleep({ ...body, userId });
    }

    @Get()
    async getUserSleeps(@Request() req) {
        const userId = Number(req.user.userId);
        return this.sleepService.getUserSleeps(userId);
    }

    @Get(':id')
    async getSleepById(@Param('id') id: string, @Request() req) {
        const userId = Number(req.user.userId);
        return this.sleepService.getSleepById(Number(id), userId);
    }

    @Patch(':id')
    async updateSleep(
        @Param('id') id: string,
        @Body() body: { start?: Date; end?: Date },
        @Request() req,
    ) {
        const userId = Number(req.user.userId);
        return this.sleepService.updateSleep(Number(id), userId, body);
    }

    @Delete(':id')
    async deleteSleep(@Param('id') id: string, @Request() req) {
        const userId = Number(req.user.userId);
        return this.sleepService.deleteSleep(Number(id), userId);
    }

    @Get('history/weekly')
    async getWeeklyHistory(@Request() req, @Query('date') date: string) {
        const userId = Number(req.user.userId);
        const referenceDate = date ? new Date(date) : new Date();
        const total = await this.sleepService.countUserSleepsWeekly(
            userId,
            referenceDate,
        );
        return { total };
    }

    @Get('history/monthly')
    async getMonthlyHistory(@Request() req, @Query('date') date: string) {
        const userId = Number(req.user.userId);
        const referenceDate = date ? new Date(date) : new Date();
        const total = await this.sleepService.countUserSleepsMonthly(
            userId,
            referenceDate,
        );
        return { total };
    }

    @Get('history/yearly')
    async getYearlyHistory(@Request() req, @Query('date') date: string) {
        const userId = Number(req.user.userId);
        const referenceDate = date ? new Date(date) : new Date();
        const total = await this.sleepService.countUserSleepsYearly(
            userId,
            referenceDate,
        );
        return { total };
    }

    @Get('time-since-last')
    async getTimeSinceLastSleep(@Request() req) {
        const userId = Number(req.user.userId);
        return this.sleepService.timeSinceLastSleep(userId);
    }

    @Get('last-month')
    async getLastMonthSleeps(@Request() req) {
        const userId = Number(req.user.userId);
        return this.sleepService.getLastMonthSleeps(userId);
    }
}
