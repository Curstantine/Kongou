import { TagObject, TagType } from '../interfaces/common';

export default class Tag implements TagObject {
  public readonly id: number;
  public readonly type: TagType;
  public readonly name: string;
  public readonly count: number;
  public readonly url: string;
  private readonly baseUrl: string;

  constructor(baseUrl: Tag['baseUrl'], tag: TagObject) {
    this.baseUrl = baseUrl;
    this.id = tag.id;
    this.type = tag.type;
    this.name = tag.name;
    this.count = tag.count;
    this.url = tag.url;
  }

  public getSiteURL() {
    return `${this.baseUrl}${this.url}`;
  }
}
