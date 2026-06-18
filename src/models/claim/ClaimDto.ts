import { ApiProperty } from '@nestjs/swagger';

export class ClaimDto {
  @ApiProperty({
    description: 'Unique identifier of the claim',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'External identifier for the claim',
    nullable: true,
    example: 'external-123',
  })
  externalId: string | null;

  @ApiProperty({
    description: 'Difficulty level of the claim',
    example: 3,
  })
  difficulty: number;

  @ApiProperty({
    description: 'Duration of the claim in seconds',
    nullable: true,
    example: 3600,
  })
  duration?: number | null;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  creationTime: Date;

  @ApiProperty({
    description: 'Deletion timestamp',
    nullable: true,
    example: '2024-01-15T11:30:00.000Z',
  })
  deletionTime?: Date | null;
}
