import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './Room';

@Entity()
@ObjectType()
export class Building {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Field()
    @Column()
    public city: string;

    @Field(type => [Room])
    @OneToMany(type =>  Room, room => room.building, { cascade: ['remove'] })
    public rooms: Room[];
}
