import { LanguageType, SortType, TagType } from '../enums';

/**
 * Builder methods for creating parameters used to query nhentai api.
 *
 * Use static {@link QueryBuilder.ugly} to create one quickly.
 */
export default class QueryBuilder {
  private tags: Map<TagType, string[]> = new Map<TagType, string[]>();
  private languages: LanguageType[] = [];
  private sort: SortType = SortType.Recent;

  private title?: string;

  /// Quick and dirty way to create a QueryBuilder.
  public static ugly(
    obj: {
      title?: string;
      languages?: LanguageType[];
      tags?: { [P in TagType]?: string[] };
    },
    sort?: SortType,
  ): QueryBuilder {
    const qb = new this();

    if (sort) qb.setSort(sort);
    if (obj.title) qb.setTitle(obj.title);
    if (obj.languages) qb.addLanguage(...obj.languages);
    if (obj.tags)
      Object.entries(obj.tags).forEach(([key, value]) => qb.addTag(key as TagType, ...value));

    return qb;
  }

  /// Removes all the filtering done till now.
  public flush(): this {
    this.tags.clear();
    this.sort = SortType.Recent;
    this.languages = [];

    return this;
  }

  public setSort(sort: SortType): this {
    this.sort = sort;

    return this;
  }

  public addTag(tag: TagType, ...value: string[]): this {
    const old_res = this.tags.get(tag);
    this.tags.set(tag, old_res !== undefined ? [...old_res, ...value] : value);

    return this;
  }

  public setTitle(title: string): this {
    this.title = title;

    return this;
  }

  public addLanguage(...values: LanguageType[]): this {
    values
      .filter((lang) => !this.languages.includes(lang))
      .forEach((lang) => this.languages.push(lang));

    return this;
  }

  /**
   * Builds the string with filtering done to this instance.
   *
   * Build sort: `title`, `language`, `tags`, `sort`
   */
  public build() {
    const strings = [
      this.title ? `title:${this.title}` : null,
      ...this.languages.map((value) => `language:${value}`),
      ...this.constructTags(),
    ]
      .filter((s) => s != null)
      .join('+');

    return [
      strings.length !== 0 ? `query=${strings}` : null,
      this.sort !== SortType.Recent ? `sort=${this.sort}` : null,
    ]
      .filter((s) => s != null)
      .join('&');
  }

  private constructTags() {
    const strings: string[] = [];

    for (const [key, values] of this.tags.entries()) {
      strings.push(values.map((value) => `${key}:${value}`).join('+'));
    }

    return strings;
  }
}
