import { Field, InputType } from 'type-graphql';

@InputType()
export class BuildingInput {

    @Field()
    public city: string;
}
