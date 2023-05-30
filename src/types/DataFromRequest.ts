import { NewFromApi } from "./NewFromApi";

export interface DataFromRequest {
 status: string;
 totalResults: number;
 articles: NewFromApi[];
}