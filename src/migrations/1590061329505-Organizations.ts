import { MigrationInterface, QueryRunner } from 'typeorm';

export default class Organization1590061329505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE organizations(
                "id" serial PRIMARY KEY,
                "name" varchar NOT NULL,
                "created_at" timestamp with time zone DEFAULT (now() at time zone 'utc'),
                "updated_at" timestamp with time zone
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE organizations;
        `);
  }
}
