import fetch from 'node-fetch';

import Book from './structures/book';
import { BookQuery, ServerBook, ServerBookQuery, UrlObject } from './types';
import { QueryBuilder } from './utils/index';

export default class Kongou {
  public readonly urls: UrlObject;
  private readonly fetcher: typeof fetch;

  constructor(fetcher?: typeof fetch, urls?: UrlObject) {
    this.fetcher = fetcher ?? fetch;
    this.urls = urls ?? Kongou.defaultUrls();
  }

  public static defaultUrls() {
    return {
      base: 'https://nhentai.net',
      api: 'https://nhentai.net/api',
      images: {
        full: 'https://i.nhentai.net/galleries',
        thumb: 'https://t.nhentai.net/galleries',
      },
    };
  }

  public async getBook(id: number | string): Promise<Book> {
    if (typeof id === 'string' && id.match(/\D/) != null) {
      throw new Error(`Given string contains non-numeric characters.`);
    }

    const response = await this.fetcher(`${this.urls.api}/gallery/${id}`);
    if (response.status !== 200) {
      throw new Error(`Request failed with '${response.statusText} [${response.status}]'!`);
    }

    return new Book(this.urls, (await response.json()) as ServerBook);
  }

  /// **NOTE**: If query is a string, it should follow the `query=` parameter format,
  /// you can use {@link QueryBuilder.ugly} to create a one easily.
  public async getByQuery(query: QueryBuilder | string): Promise<BookQuery> {
    let params;

    if (query instanceof QueryBuilder) {
      params = query.build();
    } else {
      params = query;
    }

    const response = await this.fetcher(encodeURI(`${this.urls.api}/galleries/search?${params}`));
    if (response.status !== 200) {
      throw new Error(`Request failed with '${response.statusText} [${response.status}]'!`);
    }

    const data = (await response.json()) as ServerBookQuery;
    const resultMap = new Map<Book['id'], Book>();

    data.result.forEach((result) => {
      resultMap.set(result.id, new Book(this.urls, result));
    });

    return {
      ...data,
      result: resultMap,
    };
  }

  public async getRandom(): Promise<Book> {
    const { url } = await this.fetcher(`${this.urls.base}/random`);
    const id = url.replace(/[^0-9]/gm, '');

    return this.getBook(id);
  }
}
