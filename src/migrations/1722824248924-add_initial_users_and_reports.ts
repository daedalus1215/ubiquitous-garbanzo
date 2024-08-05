import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInitialUsersAndReports1722824248924 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "user" (email, password, admin) VALUES
            ('admin@example.com', 'password1', 1),
            ('user1@example.com', 'password2', 0),
            ('user2@example.com', 'password3', 0)
        `);

        await queryRunner.query(`
            INSERT INTO "report" (approved, price, make, model, year, lng, lat, mileage, userId) VALUES
            (1, 15000, 'Toyota', 'Camry', 2019, -120, 50, 30000, 1),
            (0, 10000, 'Honda', 'Civic', 2018, -121, 51, 20000, 2),
            (1, 20000, 'Ford', 'Mustang', 2020, -122, 52, 15000, 3)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "report"`);
        await queryRunner.query(`DELETE FROM "user"`);
    }
}
