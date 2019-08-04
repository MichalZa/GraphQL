import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { articles, comments, IComment } from '../data';
import { CommentSchema } from '../schema/CommentSchema';

@Resolver(of => CommentSchema)
export class CommentResolver {

    @Query(returns => [CommentSchema])
    public fetchComments(): IComment[] {
        return comments;
    }

    @FieldResolver()
    public article(@Root() comment: IComment) {
      return articles.find(article => {
        return article.id === comment.article_id;
      });
    }
}
