import { Field, Int, ID, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Building } from './Building';

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

    @Field(type => Int)
    @Column()
    public floor: number;

    @ManyToOne(type => Building, building => building.rooms, { nullable: false })
    public building: Building;
}
