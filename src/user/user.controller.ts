// Aqui vão tudo que são rotas, que atualmente estão em app.controller tudo junto
import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { User as UserModel } from 'generated/prisma';
import { UsersService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Post('create')
    async signupUser(
        @Body()
        userData: {
            email: string;
            name: string;
            password: string;
            birthDate: Date;
            cep: string;
            estado: string;
            cidade: string;
            uf: string;
            bairro: string;
            rua: string;
            numero: string;
        },
    ): Promise<Omit<UserModel, 'password'>> {
        const hashedPassword = await this.authService.hashPassword(
            userData.password,
        );
        const user = await this.userService.createUser({
            email: userData.email,
            name: userData.name,
            password: hashedPassword,
            birthDate: userData.birthDate,
            cep: userData.cep,
            estado: userData.estado,
            cidade: userData.cidade,
            uf: userData.uf,
            bairro: userData.bairro,
            rua: userData.rua,
            numero: userData.numero,
        });
        // Não retorna a senha
        const { password, ...userWithoutPassword } = user;
        void password;
        return userWithoutPassword;
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
