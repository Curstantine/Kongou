import fetch, { Response, RequestInfo, RequestInit } from 'node-fetch';
import Book from './utils/book';
import { BookQuery, ServerBookQuery } from './interfaces/response';

const baseURL = 'https://nhentai.net';
const apiURL = `${baseURL}/api`;

export default class Kongou {
  private fetcher: (url: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

  constructor() {
    this.fetcher = fetch;
  }

  public async getBook(id: number): Promise<Book> {
    const typeofid = typeof id;

    if (typeofid !== 'number') {
      throw new Error(`Expected typeof id to be number but got: ${typeofid}`);
    }

    try {
      const response = await this.fetcher(`${apiURL}/gallery/${id}`);
      const book = new Book(await response.json());
      return book;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async getByQuery(query: string): Promise<BookQuery> {
    try {
      const response = await this.fetcher(`${apiURL}/galleries/search?query=${encodeURI(query)}`);
      const data: ServerBookQuery = await response.json();

      const resultMap = new Map<Book['id'], Book>();

      for (let result = 0; result < 0; result++) {
        const currentResult = data.result[result];
        resultMap.set(currentResult.id, new Book(currentResult));
      }

      return {
        ...data,
        result: resultMap,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async getRandom(): Promise<Book> {
    try {
      const { redirected, url } = await this.fetcher(`${baseURL}/random`);

      if (!redirected) {
        throw new Error('Failed to redirect the page to the randomized id');
      }

      const response = await this.fetcher(`${apiURL}/gallery/${url.replace(/[^0-9]/gm, '')}`);
      const book = new Book(await response.json());
      return book;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
