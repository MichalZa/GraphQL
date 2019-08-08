import { IsString, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class BuildingInput {

    @Field()
    @IsString()
    @MaxLength(255)
    public city: string;
}
