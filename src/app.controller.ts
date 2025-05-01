import { Controller } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { PostController } from './post/post.controller';

@Controller()
export class AppController {
    constructor(
        private readonly userController: UserController,
        private readonly postController: PostController,
    ) {}
}
