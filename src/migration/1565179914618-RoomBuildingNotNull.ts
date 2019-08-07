import {MigrationInterface, QueryRunner} from 'typeorm';

export class RoomBuildingNotNull1565179914618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `room` DROP FOREIGN KEY `FK_88515f15db1bc3b506028f44893`');
        await queryRunner.query('ALTER TABLE `room` CHANGE `buildingId` `buildingId` int NOT NULL');
        await queryRunner.query('ALTER TABLE `room` ADD CONSTRAINT `FK_88515f15db1bc3b506028f44893` FOREIGN KEY (`buildingId`) REFERENCES `building`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `room` DROP FOREIGN KEY `FK_88515f15db1bc3b506028f44893`');
        await queryRunner.query('ALTER TABLE `room` CHANGE `buildingId` `buildingId` int NULL');
        await queryRunner.query('ALTER TABLE `room` ADD CONSTRAINT `FK_88515f15db1bc3b506028f44893` FOREIGN KEY (`buildingId`) REFERENCES `building`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
