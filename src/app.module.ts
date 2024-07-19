import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { FsarchModule } from './fsarch/fsarch.module.js';
import { BaseTables1720373216667 } from "./database/migrations/1720373216667-base-tables.js";
import { ControllersModule } from './controllers/controllers.module.js';
import { Claim } from "./database/entities/claim.entity.js";

@Module({
  imports: [
    FsarchModule.register({
      auth: {},
      database: {
        entities: [
          Claim,
        ],
        migrations: [
          BaseTables1720373216667,
        ],
      },
    }),
    ControllersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
