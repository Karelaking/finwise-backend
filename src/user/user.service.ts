import { Injectable } from '@nestjs/common';
import { ClerkService } from 'src/clerk/clerk.service';

@Injectable()
export class UserService {
  constructor(private readonly clerkService: ClerkService) { }

}
