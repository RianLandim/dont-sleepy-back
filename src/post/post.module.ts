// Aqui eu vou exportar o controller e o service para pegar eles lá no app module
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostsService } from './post.service';

@Module({
    imports: [],
    controllers: [PostController],
    providers: [PostsService],
})
export class postModule {}
