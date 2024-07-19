import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getDataType } from './utils/data-type.mapper.js';

export class BaseTables1720373216667 implements MigrationInterface {
  name = 'BaseTables1720373216667';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    await queryRunner.createTable(
      new Table({
        name: 'claim',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__user',
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '256',
            isNullable: true,
          },
          {
            name: 'difficulty',
            type: getDataType(databaseType, 'smallint'),
            isNullable: false,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('claim');
  }
}
