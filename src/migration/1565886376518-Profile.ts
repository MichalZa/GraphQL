import {MigrationInterface, QueryRunner} from 'typeorm';

export class Profile1565886376518 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP INDEX `IDX_b53beba0b27883ab1d85d13652` ON `desk`');
        await queryRunner.query('CREATE TABLE `profile` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `phone` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, UNIQUE INDEX `REL_a24972ebd73b106250713dcddd` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `desk` ADD UNIQUE INDEX `IDX_74f85be37d754cb21c48ea0237` (`internalId`)');
        await queryRunner.query('ALTER TABLE `profile` ADD CONSTRAINT `FK_a24972ebd73b106250713dcddd9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `profile` DROP FOREIGN KEY `FK_a24972ebd73b106250713dcddd9`');
        await queryRunner.query('ALTER TABLE `desk` DROP INDEX `IDX_74f85be37d754cb21c48ea0237`');
        await queryRunner.query('DROP INDEX `REL_a24972ebd73b106250713dcddd` ON `profile`');
        await queryRunner.query('DROP TABLE `profile`');
        await queryRunner.query('CREATE UNIQUE INDEX `IDX_b53beba0b27883ab1d85d13652` ON `desk` (`userId`)');
    }

}
