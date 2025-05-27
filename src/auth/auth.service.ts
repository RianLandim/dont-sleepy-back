import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.user({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Não retorna a senha
            const { password, ...result } = user;
            void password;
            return result;
        }
        return null;
    }

    login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }
}
