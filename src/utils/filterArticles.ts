import { Article } from "../types/Article";

export function filterArticles(
  articles: Article[],
  pinnedId: number | null,
  query: string,
) {
  let visibleArticles = [...articles];
  const preparedQuery = query.trim().toLowerCase();
  const pinnedArticle = visibleArticles.find(article => article.id === pinnedId);
  const articlesWithoutPinned = visibleArticles
    .filter(article => article.id !== pinnedId)
    .map((article) => ({
      ...article,
      isPinned: false,
    }));

  visibleArticles = pinnedArticle
    ? [{...pinnedArticle, isPinned: true}, ...articlesWithoutPinned].filter(article => {
      const sutib1 = article.title.toLowerCase()
        .includes(preparedQuery);
      const sutib2 = article.description.toLowerCase()
        .includes(preparedQuery);
  
      return sutib1 || sutib2;
    })
    : articles.filter(article => {
      const sutib1 = article.title.toLowerCase()
        .includes(preparedQuery);
      const sutib2 = article.description.toLowerCase()
        .includes(preparedQuery);
  
      return sutib1 || sutib2;
    });
  
  return visibleArticles;
}