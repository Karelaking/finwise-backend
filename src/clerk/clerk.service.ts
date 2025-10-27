// clerk/clerk.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClerkClient, createClerkClient } from '@clerk/express';



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

  async getUser(userId: string) {
    return await this.clerkClient.users.getUser(userId);
  }

  async updateUser(userId: string, data: object) {
    return await this.clerkClient.users.updateUser(userId, data);
  }

  async listUsers() {
    return (await this.clerkClient.users.getUserList()).data;
  }
}
