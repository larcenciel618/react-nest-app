import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnEmailPasswordToUser1697396519545
  implements MigrationInterface
{
  name = 'AddColumnEmailPasswordToUser1697396519545';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email\` varchar(256) NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`password\` varchar(256) NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`firstName\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`firstName\` varchar(256) NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastName\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`lastName\` varchar(256) NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastName\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`lastName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`firstName\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`firstName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
  }
}
