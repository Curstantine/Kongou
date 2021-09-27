import fetch, { Response, RequestInfo, RequestInit } from 'node-fetch';
import { Book } from './book';
import { KongouBookQuery, ServerBookQuery } from './Interfaces/responses/response';

const apiURL = 'https://nhentai.net/api';

export class Kongou {
  parser: any;
  private fetcher: (url: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

  constructor(parser: any) {
    this.parser = parser;
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

  public async getByQuery(query: string): Promise<KongouBookQuery> {
    try {
      const response = await this.fetcher(`${apiURL}/galleries/search?query=${encodeURI(query)}`);
      const data: ServerBookQuery = await response.json();

      const resultMap = new Map<Book['id'], Book>();

      for (const result of data.result) {
        resultMap.set(result.id, new Book(result));
      }

      return {
        result: resultMap,
        per_page: data.per_page,
        num_pages: data.num_pages,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
