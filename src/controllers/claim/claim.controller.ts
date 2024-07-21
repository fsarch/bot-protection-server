import {
  Controller,
  Post,
  Req,
  UseGuards,
  Headers,
  Body,
  Param,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { AuthGuard } from "../../fsarch/auth/guards/auth.guard.js";
import { Roles } from "../../fsarch/uac/decorators/roles.decorator.js";
import { Role } from "../../fsarch/auth/role.enum.js";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Claim } from "../../database/entities/claim.entity.js";
import { CreateClaimDto } from "../../models/claim/CreateClaimDto.js";
import crypto from "node:crypto";
import { ApproveClaimDto } from "../../models/claim/ApproveClaimDto.js";

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

  @Post('/:claimId/_actions/approve')
  @UseGuards(AuthGuard)
  @Roles(Role.manage_claims)
  async approveClaim(@Body() body: ApproveClaimDto, @Param('claimId') claimId: string) {
    const claim = await this.claimRepository.findOne({
      where: {
        id: claimId,
      },
    });

    if (!claim) {
      throw new NotFoundException();
    }

    const startString = ''.padStart(claim.difficulty, '0');

    if (body.hash && !body.hash.startsWith(startString)) {
      throw new BadRequestException();
    }

    const hash = crypto.createHash('sha256')
      .update(`${claimId}${body.nonce}`)
      .digest('hex');

    if (!hash.startsWith(startString)) {
      throw new BadRequestException();
    }

    if (body.hash && body.hash !== hash) {
      throw new BadRequestException();
    }

    claim.duration = body.duration;
    claim.deletionTime = new Date();
    await this.claimRepository.save(claim);
  }
}
