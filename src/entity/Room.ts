import { Authorized, Field, Int, ID, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Building } from './Building';
import { Desk } from './Desk';

@Entity()
@ObjectType()
export class Room {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Field()
    @Column()
    public name: string;

    @Field()
    @Column()
    public type: string;

    @Authorized()
    @Field(type => Int)
    @Column()
    public floor: number;

    @ManyToOne(type => Building, building => building.rooms, { nullable: false })
    public building: Building;

    @OneToMany(type => Desk, desk => desk.room)
    public desks: Desk[];
}
