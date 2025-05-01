// Aqui vão tudo que são rotas, que atualmente estão em app.controller tudo junto
import { Controller, Post, Body } from '@nestjs/common';
import { User as UserModel } from 'generated/prisma';
import { UsersService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Post('user')
    async signupUser(
        @Body() userData: { name?: string; email: string },
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }
}
