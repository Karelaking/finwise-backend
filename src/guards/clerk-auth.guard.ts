import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      // Verify the session token
      const sessionToken = await clerkClient.verifyToken(token, {
        jwtKey: process.env.CLERK_JWT_KEY,
      });

      // Get session details
      const session = await clerkClient.sessions.getSession(
        sessionToken.sid as string,
      );

      // Get user details
      const user = await clerkClient.users.getUser(sessionToken.sub);

      // Attach Clerk auth data to request
      (request as ClerkAuthenticatedRequest).auth = {
        userId: user.id,
        sessionId: session.id,
        user,
        session,
        orgId: sessionToken.org_id as string | undefined,
        orgRole: sessionToken.org_role as string | undefined,
        orgSlug: sessionToken.org_slug as string | undefined,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid or expired authentication token',
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
