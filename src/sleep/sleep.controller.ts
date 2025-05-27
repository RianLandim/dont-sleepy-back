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
}
