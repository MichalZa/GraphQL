import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class RoomInput {

    @Field()
    public name: string;

    @Field()
    public type: string;

    @Field(type => Int)
    public floor: number;

    @Field(type => Int)
    public buildingId: number;
}
