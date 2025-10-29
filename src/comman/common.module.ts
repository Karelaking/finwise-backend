import { Module } from "@nestjs/common";
import { CommonService } from "./common.service";
import { EmailService } from "./email.service";
@Module({
  imports: [], 
  providers: [CommonService, EmailService],
})
export class CommonModule{}