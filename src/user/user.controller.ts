import { User } from '@clerk/express';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClerkService } from 'src/clerk/clerk.service';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';


@Controller('user')
export class UserController {
  constructor(private readonly clerkService: ClerkService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return await this.clerkService.getUser(userId);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto | object,
  ): Promise<User> {
    return await this.clerkService.updateUser(userId, updateUserDto);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return await this.clerkService.deleteUser(userId);
  }

  @Get('ban/:userId')
  async banUser(@Param('userId') userId: string): Promise<User> {
    return await this.clerkService.banUser(userId);
  }

  @Get('unban/:userId')
  async unbanUser(@Param('userId') userId: string): Promise<User> {
    return await this.clerkService.unbanUser(userId);
  }
}
