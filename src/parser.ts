import { Response, TagCategory, ImageObject, QueryResponse, TagObject } from './Interfaces/parser'
import { ServerResponse, PageExt, ServerQueryResponse, ServerTagObject } from './Interfaces/server'

export default class Parser {
    defaultSite: string
    staticSite: {
        thumbnails: string,
        images: string
    }

    constructor (defaultSite: string, staticSite: {thumbnails: string, images: string}) {
      this.defaultSite = defaultSite
      this.staticSite = staticSite
    }

    static toPageExt (extension: string): PageExt {
      switch (extension) {
        case 'j':
          return PageExt.j
        case 'p':
          return PageExt.p
        case 'g':
          return PageExt.g
        default:
          return PageExt.j
      }
    }

    static toString (str: string): string {
      return str.split(' ').map((x) => x.charAt(0).toLocaleUpperCase() + x.substr(1)).join(' ')
    }

    static toURLString (str: string): string {
      return str.trim().split(' ').join('+').split('_').join('+')
    }

    toParseTags (array: ServerTagObject[], search: ServerTagObject['type']): TagObject[] {
      return array.filter((tag) => tag.type === search).map((tag) => {
        return {
          id: tag.id,
          name: Parser.toString(tag.name),
          url: this.defaultSite + tag.url,
          count: tag.count
        }
      })
    }

    parseResponse (data: ServerResponse): Response {
      const tags: TagCategory = {
        artists: this.toParseTags(data.tags, 'artist'),
        category: this.toParseTags(data.tags, 'category'),
        characters: this.toParseTags(data.tags, 'character'),
        groups: this.toParseTags(data.tags, 'groups'),
        languages: this.toParseTags(data.tags, 'language'),
        parodies: this.toParseTags(data.tags, 'parody'),
        tags: this.toParseTags(data.tags, 'tag')
      }

      const images: ImageObject = {
        pages: data.images.pages.map((page, i) => this.staticSite.images + `/${data.media_id}` + `/${i + 1}.` + `${Parser.toPageExt(page.t)}`),
        thumbnail: this.staticSite.thumbnails + `/${data.media_id}` + '/1t.' + `${Parser.toPageExt(data.images.thumbnail.t)}`,
        cover: this.staticSite.thumbnails + `/${data.media_id}` + '/cover.' + `${Parser.toPageExt(data.images.cover.t)}`
      }

      return {
        id: typeof data.id === 'string' ? parseInt(data.id) : data.id,
        media_id: parseInt(data.media_id),
        url: this.defaultSite + '/g/' + data.id,
        title: {
          english: data.title.english,
          native: data.title.japanese,
          pretty: data.title.pretty
        },
        scanlator: data.scanlator || undefined,
        upload_date: new Date(data.upload_date * 1000),
        images: images,
        tags: tags,
        num_pages: data.num_pages,
        num_favorites: data.num_favorites
      }
    }

    parseQueryResponse (data: ServerQueryResponse): QueryResponse {
      return {
        result: data.result.map((result) => this.parseResponse(result)),
        num_pages: data.num_pages,
        per_page: data.per_page
      }
    }
}
