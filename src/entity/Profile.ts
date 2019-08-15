import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
@ObjectType()
export class Profile {

    @PrimaryGeneratedColumn()
    public readonly id: number;

    @JoinColumn()
    @OneToOne(type => User, user => user.profile, { nullable: false })
    public user: User;
    @Column({ nullable: false })
    public userId: number;

    @Field()
    @Column()
    public phone: string;

    @Field()
    @Column()
    public address: string;
}
