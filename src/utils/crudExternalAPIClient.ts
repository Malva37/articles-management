const API_KEY = 'adbd92c5c51f4b8eaf3c1e8fffb7d3a4';
const PAGE_SIZE = 10;
const DOMAIN = 'techcrunch.com';
const BASE_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&pageSize=${PAGE_SIZE}&domains=${DOMAIN}`;

async function request<T>(
  url: string,
  method: string = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  const response = await fetch(BASE_URL + url, options);

  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
