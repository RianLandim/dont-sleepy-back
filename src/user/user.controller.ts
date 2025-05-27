// Aqui vão tudo que são rotas, que atualmente estão em app.controller tudo junto
import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { User as UserModel } from 'generated/prisma';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Post('create')
    async signupUser(
        @Body()
        userData: {
            email: string;
            name: string;
            password: string;
            birthDate: Date;
        },
    ): Promise<UserModel> {
        return this.userService.createUser({
            email: userData.email,
            name: userData.name,
            password: userData.password,
            birthDate: userData.birthDate,
        });
    }

    @Get('all')
    async getUsers(
        @Query('skip') skip?: number,
        @Query('take') take?: number,
    ): Promise<UserModel[]> {
        return this.userService.users({
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
        });
    }
}
