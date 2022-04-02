import { LanguageType, TagType } from '../interfaces/common';

// TODO
export default class QueryBuilder {
  private string: string;

  private artists?: string;
  private author?: string;
  private tags?: TagType[];
  private languages?: LanguageType[];

  /// If you are passing string through this,
  /// you might not actually need this.
  constructor(string?: string) {
    this.string = '';
  }
}
