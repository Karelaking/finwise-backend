import { User } from '@clerk/express';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClerkService } from 'src/clerk/clerk.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';


@Controller('user')
export class UserController {
  constructor(private readonly clerkService: ClerkService) {}

  @Get(':userId')
  @HttpCode(HttpStatus.FOUND)
  async getUser(@Param('userId') userId: string): Promise<User> {
    return await this.clerkService.getUser(userId);
  }

  @Patch(':userId')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto | object,
  ): Promise<User> {
    return await this.clerkService.updateUser(userId, updateUserDto);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('userId') userId: string) {
    return await this.clerkService.deleteUser(userId);
  }

  @Get('ban/:userId')
  @HttpCode(HttpStatus.OK)
  async banUser(@Param('userId') userId: string): Promise<User> {
    return await this.clerkService.banUser(userId);
  }

  @Get('unban/:userId')
  @HttpCode(HttpStatus.OK)
  async unbanUser(@Param('userId') userId: string): Promise<User> {
    return await this.clerkService.unbanUser(userId);
  }
}
