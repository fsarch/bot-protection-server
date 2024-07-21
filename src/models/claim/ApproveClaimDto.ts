import { IsInt, IsString, MaxLength } from "class-validator";
import { Optional } from "@nestjs/common";

export class ApproveClaimDto {
  @IsInt()
  nonce: number;

  @IsString()
  @Optional()
  @MaxLength(256)
  hash?: string;

  @IsInt()
  @Optional()
  duration?: number;
}
