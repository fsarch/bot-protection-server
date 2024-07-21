import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { FsarchModule } from './fsarch/fsarch.module.js';
import { BaseTables1720373216667 } from "./database/migrations/1720373216667-base-tables.js";
import { ControllersModule } from './controllers/controllers.module.js';
import { Claim } from "./database/entities/claim.entity.js";
import { AddDuration1721562384956 } from "./database/migrations/1721562384956-add-duration.js";

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
          AddDuration1721562384956,
        ],
      },
    }),
    ControllersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
