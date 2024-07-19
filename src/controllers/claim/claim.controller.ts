import { Controller, Post, Req, UseGuards, Headers, Body } from '@nestjs/common';
import { AuthGuard } from "../../fsarch/auth/guards/auth.guard.js";
import { Roles } from "../../fsarch/uac/decorators/roles.decorator.js";
import { Role } from "../../fsarch/auth/role.enum.js";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Claim } from "../../database/entities/claim.entity.js";
import { CreateClaimDto } from "../../models/claim/CreateClaimDto.js";
import crypto from "node:crypto";

@Controller('claims')
export class ClaimController {
  constructor(
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
  ) {
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.manage_claims)
  async createClaim(@Body() body: CreateClaimDto) {
    const id = crypto.randomUUID();

    const createdClaim = this.claimRepository.create({
      id,
      difficulty: body.difficulty ?? 3,
      externalId: body.externalId ?? null,
    });
    const savedClaim = await this.claimRepository.save(createdClaim);

    return {
      id: savedClaim.id,
      difficulty: savedClaim.difficulty,
    };
  }

  @Post('/_actions/approve')
  @UseGuards(AuthGuard)
  @Roles(Role.manage_claims)
  async approveClaim(@Headers() headers: Record<string, string | undefined>, @Req() request: Request) {
    const path = headers['x-path'] || headers['x-filename'];


  }
}
