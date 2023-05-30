export interface Article {
  id: number;
  title: string;
  author: string;
  image: string | File;
  description: string;
  isPinned: boolean;
}