// Aqui eu vou exportar o controller e o service para pegar eles lá no app module
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [UserController],
    providers: [UsersService, PrismaService],
    exports: [UsersService],
})
export class userModule {}
