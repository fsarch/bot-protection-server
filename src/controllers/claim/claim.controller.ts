import {
  Controller,
  Post,
  UseGuards,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  Get,
  Query,
} from '@nestjs/common';

import { AuthGuard } from "@fsarch/server/auth";
import { Roles } from "@fsarch/server/uac";
import { PaginationResultDto, ApiOkPaginatedResponse } from "@fsarch/server/pagination";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Claim } from "../../database/entities/claim.entity.js";
import { CreateClaimDto } from "../../models/claim/CreateClaimDto.js";
import crypto from "node:crypto";
import { ApproveClaimDto } from "../../models/claim/ApproveClaimDto.js";
import { ClaimDto } from "../../models/claim/ClaimDto.js";
import { Role } from "../../constants/role.enum.js";

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

  @Get()
  @UseGuards(AuthGuard)
  @Roles(Role.manage_claims)
  @ApiOkPaginatedResponse(ClaimDto)
  async listClaims(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 25,
  ): Promise<PaginationResultDto<ClaimDto>> {
    const skip = (page - 1) * pageSize;
    const [claims, totalItems] = await this.claimRepository.findAndCount({
      skip,
      take: pageSize,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    const data: ClaimDto[] = claims.map((claim) => ({
      id: claim.id,
      externalId: claim.externalId,
      difficulty: claim.difficulty,
      duration: claim.duration,
      creationTime: claim.creationTime,
      deletionTime: claim.deletionTime,
    }));

    return {
      data,
      metadata: {
        currentPage: page,
        totalPages,
        pageSize,
        totalItems,
      },
    };
  }

  @Get('/:claimId')
  @UseGuards(AuthGuard)
  @Roles(Role.manage_claims)
  async getClaim(@Param('claimId') claimId: string): Promise<ClaimDto> {
    const claim = await this.claimRepository.findOne({
      where: {
        id: claimId,
      },
    });

    if (!claim) {
      throw new NotFoundException();
    }

    return {
      id: claim.id,
      externalId: claim.externalId,
      difficulty: claim.difficulty,
      duration: claim.duration,
      creationTime: claim.creationTime,
      deletionTime: claim.deletionTime,
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
