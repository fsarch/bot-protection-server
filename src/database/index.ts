import { Claim } from "./entities/claim.entity.js";
import { AddDuration1721562384956 } from "./migrations/1721562384956-add-duration.js";
import { BaseTables1720373216667 } from "./migrations/1720373216667-base-tables.js";

export const DATABASE_OPTIONS = {
  entities: [
    Claim,
  ],
  migrations: [
    BaseTables1720373216667,
    AddDuration1721562384956,
  ],
};
