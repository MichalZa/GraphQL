import { Authorized, Field, Int, ID, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './Room';
import { User } from './User';

@Entity()
@ObjectType()
export class Desk {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Authorized('ROLE_ADMIN')
    @Field(type => Int)
    @Column({ unique: true })
    public internalId: number;

    @ManyToOne(type => Room, room => room.desks, { nullable: false })
    public room: Room;

    @JoinColumn()
    @Field(type => User, { nullable: true })
    @OneToOne(type => User, user => user.desk)
    public user?: User;
    @Column({ nullable: true })
    public userId: number;
}
