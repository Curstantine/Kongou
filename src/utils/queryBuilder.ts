import { LanguageType, SortType, TagType } from '../enums';

export default class QueryBuilder {
  private readonly string: string;

  private tags: Map<TagType, string[]> = new Map<TagType, string[]>();
  private languages: LanguageType[] = [];
  private sort: SortType = SortType.Recent;

  /// If you are passing string through this,
  /// you might not actually need this.
  constructor(string?: string) {
    this.string = string ?? '';
  }

  public flush(): this {
    this.tags.clear();
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

  public addLanguage(...values: LanguageType[]): this {
    values
      .filter((lang) => !this.languages.includes(lang))
      .forEach((lang) => this.languages.push(lang));

    return this;
  }

  public build() {
    const strings = [...this.constructLanguages(), ...this.constructTags()];

    return [strings.join('+'), this.sort !== SortType.Recent ? `sort=${this.sort}` : null]
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

  private constructLanguages() {
    return this.languages.map((value) => `language:${value}`);
  }
}
