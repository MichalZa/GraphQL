import { IsInt, IsString, MaxLength, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class RoomInput {

    @Field()
    @IsString()
    @MaxLength(255)
    public name: string;

    @Field()
    @IsString()
    @MaxLength(255)
    public type: string;

    @Min(0)
    @IsInt()
    @Field(type => Int)
    public floor: number;

    @Field(type => Int)
    public buildingId: number;
}
