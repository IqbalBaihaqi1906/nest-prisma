import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  // Req,
  // Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserSettingDto,
} from '../dtos/User_dtos';
// import { Request } from 'express';
// import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new HttpException('User Not Found', 404);
    }

    return user;
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserData: UpdateUserDto,
  ) {
    const user = await this.usersService.updateUserById(id, updateUserData);

    if (!user) {
      throw new HttpException('User Not Found', 404);
    }

    return user;
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.deleteUserById(id);

    return user;
  }

  @Patch(':id/settings')
  async updateUserSettings(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserSettingData: UpdateUserSettingDto,
  ) {
    const updateUserSetting = await this.usersService.updateUserSetting(
      id,
      updateUserSettingData,
    );

    return updateUserSetting;
  }
}
