import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClerkClient, createClerkClient, User } from '@clerk/express';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class ClerkService {
  private readonly clerkClient: ClerkClient;

  constructor(private readonly configService: ConfigService) {
    this.clerkClient = createClerkClient({
      secretKey: this.configService.get<string>('clerk.clerk_secret_key'),
    });
  }

  getClient() {
    return this.clerkClient;
  }

  async getUser(userId: string): Promise<User> {
    return await this.clerkClient.users.getUser(userId);
  }

  async updateUser(userId: string, data: UpdateUserDto | object): Promise<User> {
    return await this.clerkClient.users.updateUser(userId, data);
  }

  async listUsers(): Promise<User[]> {
    return (await this.clerkClient.users.getUserList()).data;
  }

  async deleteUser(userId: string): Promise<User> {
    return await this.clerkClient.users.deleteUser(userId);
  }

  async banUser(userId: string): Promise<User> {
    return await this.clerkClient.users.banUser(userId);
  }

  async unbanUser(userId: string): Promise<User> {
    return await this.clerkClient.users.unbanUser(userId);
  }
}
