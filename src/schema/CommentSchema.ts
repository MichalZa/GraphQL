import { Field, Int, ObjectType } from 'type-graphql';
import { ArticleSchema } from './ArticleSchema';

@ObjectType()
export class CommentSchema {

    @Field(type => Int)
    public id: number;

    @Field()
    public text: string;

    @Field(type => ArticleSchema)
    public article: ArticleSchema;
}
