import {MigrationInterface, QueryRunner} from 'typeorm';

export class User1565348940865 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `fullName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` text NOT NULL, `roomId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `user` ADD CONSTRAINT `FK_9a5b6e98e76999b2c6778a30eec` FOREIGN KEY (`roomId`) REFERENCES `room`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `user` DROP FOREIGN KEY `FK_9a5b6e98e76999b2c6778a30eec`');
        await queryRunner.query('DROP TABLE `user`');
    }

}
