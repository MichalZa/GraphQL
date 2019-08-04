import { Field, Int, ObjectType } from 'type-graphql';
import { CommentSchema } from './CommentSchema';

@ObjectType()
export class ArticleSchema {

    @Field(type => Int)
    public id: number;

    @Field()
    public name: string;

    @Field()
    public published: boolean;

    @Field(type => [CommentSchema])
    public comments: CommentSchema[];
}
