import { Module } from '@nestjs/common';
import { ClaimModule } from './claim/claim.module.js';

@Module({
  imports: [ClaimModule]
})
export class ControllersModule {}
