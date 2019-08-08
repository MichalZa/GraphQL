import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './Room';

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

    @ManyToOne(type => Room, room => room.users)
    public room: Room;
}
