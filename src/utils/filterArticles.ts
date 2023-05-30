import { Article } from "../types/Article";

export function filterArticles(
  articles: Article[],
  query: string,
) {
  let visibleArticles = [...articles];
  const preparedQuery = query.trim().toLowerCase();

  return visibleArticles.filter(article => {
        const sutib1 = article.title.toLowerCase()
          .includes(preparedQuery);
        const sutib2 = article.description.toLowerCase()
          .includes(preparedQuery);
    
        return sutib1 || sutib2;
      });
}