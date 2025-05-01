// Aqui eu vou exportar o controller e o service para pegar eles lá no app module
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UsersService],
})
export class userModule {}
