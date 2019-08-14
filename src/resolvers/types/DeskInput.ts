import { IsInt, MaxLength, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class DeskInput {

    @Min(0)
    @Field()
    @IsInt()
    @MaxLength(255)
    public internalId: number;

    @Min(0)
    @Field()
    @IsInt()
    @MaxLength(255)
    public roomId: number;
}
