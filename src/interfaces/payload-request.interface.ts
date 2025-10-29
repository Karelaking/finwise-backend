import { Session, User } from "@clerk/express"
import { Request } from "express"

export interface PayloadRequest extends Request {
  isPublic?: boolean;
  auth: {
    userId: string;
    sessionId: string;
    user: User | null;
    session: Session | null;
    orgId?: string;
    orgRole?: string;
    orgSlug?: string;
  };
}