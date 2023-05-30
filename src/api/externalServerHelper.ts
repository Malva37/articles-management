import { DataFromRequest } from "../types/DataFromRequest";
import { client } from "../utils/crudExternalAPIClient";

export const getNewsFromApi = async (page: number) => {
  const response = await client.get<DataFromRequest>(`&page=${page}`);

  return response;
};