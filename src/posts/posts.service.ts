import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createNewPost(
    userId: number,
    postData: Prisma.PostCreateWithoutUserInput,
  ) {
    const newPost = await this.prisma.post.create({
      data: {
        ...postData,
        userId,
      },
    });

    return newPost;
  }

  async createGroupPost(
    userIds: number[],
    postData: Prisma.GroupPostCreateWithoutUsersInput,
  ) {
    const newGroupPost = await this.prisma.groupPost.create({
      data: {
        ...postData,
        users: {
          create: userIds.map((userId) => ({ userId })),
        },
      },
    });

    return newGroupPost;
  }

  async getGroupPosts() {
    const groupPosts = await this.prisma.groupPost.findMany({
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    return groupPosts;
  }
}
