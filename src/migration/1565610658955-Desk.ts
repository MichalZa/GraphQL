import {MigrationInterface, QueryRunner} from 'typeorm';

export class Desk1565610658955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `user` DROP FOREIGN KEY `FK_9a5b6e98e76999b2c6778a30eec`');
        await queryRunner.query('CREATE TABLE `desk` (`id` int NOT NULL AUTO_INCREMENT, `internalId` int NOT NULL, `roomId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `user` DROP COLUMN `roomId`');
        await queryRunner.query('ALTER TABLE `desk` ADD CONSTRAINT `FK_cb2c1f2f94e1ca1966a938eabb4` FOREIGN KEY (`roomId`) REFERENCES `room`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `desk` DROP FOREIGN KEY `FK_cb2c1f2f94e1ca1966a938eabb4`');
        await queryRunner.query('ALTER TABLE `user` ADD `roomId` int NULL');
        await queryRunner.query('DROP TABLE `desk`');
        await queryRunner.query('ALTER TABLE `user` ADD CONSTRAINT `FK_9a5b6e98e76999b2c6778a30eec` FOREIGN KEY (`roomId`) REFERENCES `room`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
