import { MigrationInterface, QueryRunner } from 'typeorm';

export default class Roles1590060458226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE roles(
                "id" serial PRIMARY KEY,
                "name" varchar NOT NULL,
                "created_at" timestamp with time zone DEFAULT (now() at time zone 'utc'),
                "updated_at" timestamp with time zone
            );
            INSERT INTO roles(name) VALUES ('guest'), ('user'), ('admin');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE roles;
        `);
  }
}
