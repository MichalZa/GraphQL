import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Desk } from './Desk';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column()
    public fullName: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column({
        type: 'simple-array',
    })
    public role: string[];

    @OneToOne(type => Desk, desk => desk.user)
    public desk: Desk;
}
