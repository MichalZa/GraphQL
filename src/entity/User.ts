import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Desk } from './Desk';

@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Field()
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

    @Field(type => Desk)
    @OneToOne(type => Desk, desk => desk.user)
    public desk: Desk;
}
