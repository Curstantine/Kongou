import { TagObject } from '../interfaces/common';

export default class Tag {
  private id: number;
  private name: string;
  private count: number;
  private url: string;

  constructor(tag: TagObject) {
    this.id = tag.id;
    this.name = tag.name;
    this.count = tag.count;
    this.url = tag.url;
  }

  public getSiteURL() {
    return `https://nhentai.net${this.url}`;
  }
}
