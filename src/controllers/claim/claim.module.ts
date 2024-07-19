import { Module } from '@nestjs/common';
import { ClaimController } from './claim.controller.js';
import { ClaimService } from './claim.service.js';
import { Claim } from "../../database/entities/claim.entity.js";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([Claim]),
  ],
  controllers: [ClaimController],
  providers: [ClaimService]
})
export class ClaimModule {}
