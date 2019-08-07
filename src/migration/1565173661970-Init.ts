import {MigrationInterface, QueryRunner} from 'typeorm';

export class Init1565173661970 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `room` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `floor` int NOT NULL, `buildingId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `building` (`id` int NOT NULL AUTO_INCREMENT, `city` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `room` ADD CONSTRAINT `FK_88515f15db1bc3b506028f44893` FOREIGN KEY (`buildingId`) REFERENCES `building`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `room` DROP FOREIGN KEY `FK_88515f15db1bc3b506028f44893`');
        await queryRunner.query('DROP TABLE `building`');
        await queryRunner.query('DROP TABLE `room`');
    }

}
