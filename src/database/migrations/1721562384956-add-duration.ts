import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDuration1721562384956 implements MigrationInterface {
  name = 'AddDuration1721562384956';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    await queryRunner.addColumn('claim', new TableColumn({
      name: 'duration',
      type: 'integer',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('claim', 'duration');
  }
}
