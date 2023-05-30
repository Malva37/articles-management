import { Article } from "../types/Article";

export function sortArticles(
  articles: Article[],
) {
  return [...articles].sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1));
}