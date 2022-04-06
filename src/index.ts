import fetch from 'node-fetch';

import Book from './structures/book';
import { BookQuery, ServerBook, ServerBookQuery, UrlObject } from './types';

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
      throw new Error(`Given string contains non-numeric characters!`);
    }

    const throwable = (error: Error) => {
      throw error;
    };

    const response = await this.fetcher(`${this.urls.api}/gallery/${id}`);

    if (response.status !== 200) {
      throwable(new Error(`Request failed with '${response.statusText} [${response.status}]'!`));
    }

    return new Book(this.urls, (await response.json()) as ServerBook);
  }

  public async getByQuery(query: string): Promise<BookQuery> {
    const response = await this.fetcher(
      `${this.urls.api}/galleries/search?query=${encodeURI(query)}`,
    );
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
