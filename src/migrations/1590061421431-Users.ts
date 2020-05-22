import { MigrationInterface, QueryRunner } from 'typeorm';

export default class Users1590061421431 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE users(
                "id" serial PRIMARY KEY,
                "name" varchar NOT NULL,
                "login" varchar NOT NULL,
                "password" varchar NOT NULL,
                "organization_id" integer NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
                "created_at" timestamp with time zone DEFAULT (now() at time zone 'utc'),
                "updated_at" timestamp with time zone,
                "deleted_at" timestamp with time zone
            );

            CREATE TABLE users_roles(
                "id" serial PRIMARY KEY,
                "user_id" integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                "role_id" integer NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
                "created_at" timestamp with time zone DEFAULT (now() at time zone 'utc'),
                "updated_at" timestamp with time zone,
                UNIQUE("user_id", "role_id")
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE users_roles;
            DROP TABLE users;
        `);
  }
}
