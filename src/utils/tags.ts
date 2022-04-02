import { TagObject, TagType } from '../interfaces/common';

export default class Tags {
  private readonly tags: Map<TagType, TagObject[]>;
  private readonly baseUrl: string;

  constructor(baseUrl: Tag['baseUrl'], tagObjects: TagObject[]) {
    this.baseUrl = baseUrl;
    this.tags = new Map();

    for (const name of Object.values(TagType)) {
      const tags = tagObjects.filter((t) => t.type === name);
      this.tags.set(name, tags);
    }
  }

  public getTagsWithType(type: TagType): Tag[] {
    return this.tags.get(type)!.map((tag) => new Tag(this.baseUrl, tag));
  }

  public getAllTags(): Tag[] {
    let filter = [];

    for (let value of this.tags.values()) {
      filter.push(...value);
    }

    return filter.map((tag) => new Tag(this.baseUrl, tag));
  }
}

// export class Tag<T extends TagType> implements TagObject
// public readonly name: T extends TagType.Language ? LanguageType : string;

export class Tag implements TagObject {
  public readonly id: number;
  public readonly type: TagType;
  public readonly name: string;
  public readonly count: number;
  public readonly url: string;
  private readonly baseUrl: string;

  constructor(baseUrl: string, tag: TagObject) {
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
