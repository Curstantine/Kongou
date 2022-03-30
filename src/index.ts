import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch';
import Book from './utils/book';
import { BookQuery, ServerBook, ServerBookQuery } from './interfaces/response';

const baseURL = 'https://nhentai.net';
const apiURL = `${baseURL}/api`;

export default class Kongou {
  private readonly fetcher: typeof fetch;

  constructor(fetcher?: typeof fetch) {
    this.fetcher = fetcher ?? fetch;
  }

  public async getBook(id: number | string): Promise<Book> {
    if (typeof id === "string" && id.match(/\D/) != null) {
      throw new Error(`Given string contains non-numeric characters!`);
    }

    try {
      const response = await this.fetcher(`${apiURL}/gallery/${id}`);
      return new Book(await response.json() as ServerBook);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async getByQuery(query: string): Promise<BookQuery> {
    try {
      const response = await this.fetcher(`${apiURL}/galleries/search?query=${encodeURI(query)}`);
      const data = await response.json() as ServerBookQuery;

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
      const { url } = await this.fetcher(`${baseURL}/random`);
      const id = url.replace(/[^0-9]/gm, '');

      return this.getBook(id);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
