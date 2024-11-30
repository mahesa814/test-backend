import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732978527408 implements MigrationInterface {
    name = 'Migration1732978527408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" ADD "customerId" uuid`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_487ec4ed757eed0d34c7ddee79b" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_487ec4ed757eed0d34c7ddee79b"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "customerId"`);
    }

}
