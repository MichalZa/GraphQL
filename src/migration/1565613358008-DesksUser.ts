import {MigrationInterface, QueryRunner} from "typeorm";

export class DesksUser1565613358008 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `desk` ADD `userId` int NULL");
        await queryRunner.query("ALTER TABLE `desk` ADD UNIQUE INDEX `IDX_b53beba0b27883ab1d85d13652` (`userId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_b53beba0b27883ab1d85d13652` ON `desk` (`userId`)");
        await queryRunner.query("ALTER TABLE `desk` ADD CONSTRAINT `FK_b53beba0b27883ab1d85d13652d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `desk` DROP FOREIGN KEY `FK_b53beba0b27883ab1d85d13652d`");
        await queryRunner.query("DROP INDEX `REL_b53beba0b27883ab1d85d13652` ON `desk`");
        await queryRunner.query("ALTER TABLE `desk` DROP INDEX `IDX_b53beba0b27883ab1d85d13652`");
        await queryRunner.query("ALTER TABLE `desk` DROP COLUMN `userId`");
    }

}
