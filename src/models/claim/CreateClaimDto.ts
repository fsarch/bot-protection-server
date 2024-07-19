import { IsInt, IsString, MaxLength } from "class-validator";
import { Optional } from "@nestjs/common";

export class CreateClaimDto {
  @IsInt()
  @Optional()
  difficulty?: number;

  @IsString()
  @Optional()
  @MaxLength(256)
  externalId?: string;
}
