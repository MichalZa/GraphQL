import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { articles, comments, IArticle } from '../data';
import { ArticleSchema } from '../schema/ArticleSchema';

@Resolver(of => ArticleSchema)
export class ArticleResolver {

    @Query(returns => [ArticleSchema])
    public fetchArticles(): IArticle[] {
        return articles;
    }

    @Query(returns => ArticleSchema, { nullable: true })
    public projectByName(@Arg('name') name: string): IArticle | undefined {
        return articles.find(article => article.name === name);
    }

    @FieldResolver()
    public comments(@Root() article: IArticle) {
        return comments.filter(comment => {
            return comment.article_id === article.id;
        });
    }
}
