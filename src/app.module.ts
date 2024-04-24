import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
// import { UsersService } from './users/users.service';
// import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
