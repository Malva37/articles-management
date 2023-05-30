import { Article } from "../types/Article";
import { client } from "../utils/crudLocalDBClient";

export const getArticles = async () => {
  const response = await client.get<Article[]>("/articles");

  return response;
};

export const deleteArticle = async (articleId: number) => {
  const response = await client.delete(`/articles/${articleId}`);

  return response;
};

export const addArticle = async (article: Article) => {
  const response = await client.post<Article>("/articles", article);

  return response;
};

export const updateArticle = (articleId: number, article: Article) => {
  return client.patch<Article>(`/articles/${articleId}`, article);
};

export const updatePinnedArticles = async ( articles: Article[]) => {
  const response  = await Promise.all(
    articles.map(article => {
      return client.patch<Article>(`/articles/${article.id}`, article)
    }
  ));

  return response;
};
