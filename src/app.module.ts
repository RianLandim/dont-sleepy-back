import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { postModule } from './post/post.module';
import { PrismaService } from './prisma.service';
import { userModule } from './user/user.module';

@Module({
    imports: [userModule, postModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
