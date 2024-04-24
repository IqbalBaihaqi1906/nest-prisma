import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(createUserData: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...createUserData,
        userSetting: {
          create: {
            smsEnabled: true,
            notification: false,
          },
        },
      },
    });
  }

  getUsers() {
    return this.prisma.user.findMany({
      include: {
        userSetting: true,
        posts: true,
        groupPosts: {
          include: {
            groupPost: true,
          },
        },
      }, // include relation
    });
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userSetting: {
          select: {
            // select specific fields
            id: true,
            smsEnabled: true,
            notification: true,
          },
        },
        posts: true,
      }, // include relation
    });
  }

  async updateUserById(id: number, updateUserData: Prisma.UserUpdateInput) {
    if (updateUserData.username) {
      const user = await this.prisma.user.findUnique({
        where: { username: updateUserData.username as string },
      });

      if (user) {
        throw new HttpException('Username already exists', 400);
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserData,
    });

    return updatedUser;
  }

  async deleteUserById(id: number) {
    const isUserExist = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!isUserExist) {
      throw new HttpException('User Not Found', 404);
    }

    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    return deletedUser;
  }

  async updateUserSetting(
    userId: number,
    settingData: Prisma.UserSettingUpdateInput,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userSetting: {
          select: {
            // select specific fields
            id: true,
            smsEnabled: true,
            notification: true,
          },
        },
      },
    });

    if (!user) {
      throw new HttpException('User Not Found', 404);
    }

    if (!user.userSetting) {
      throw new HttpException('User Setting Not Found', 404);
    }

    const updateUserSetting = await this.prisma.userSetting.update({
      where: { id: user.userSetting.id },
      data: settingData,
    });

    return updateUserSetting;
  }
}
