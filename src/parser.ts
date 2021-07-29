import { Response, TagCategory, ImageObject, QueryResponse } from './Interfaces/parser'
import { ServerResponse, PageExt, ServerQueryResponse } from './Interfaces/server'

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
      return str.trim().split(' ').join('+').split('_').join('+')
    }

    parseResponse (data: ServerResponse): Response {
      const tags: TagCategory = {
        artists: data.tags.filter((value) => value.type === 'artist'),
        category: data.tags.filter((value) => value.type === 'category'),
        characters: data.tags.filter((value) => value.type === 'character'),
        groups: data.tags.filter((value) => value.type === 'groups'),
        languages: data.tags.filter((value) => value.type === 'language'),
        parodies: data.tags.filter((value) => value.type === 'parody'),
        tags: data.tags.filter((value) => value.type === 'tag')
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

    parseResponseArray (data: ServerQueryResponse): QueryResponse {
      return {
        result: data.result.map((result) => this.parseResponse(result)),
        num_pages: data.num_pages,
        per_page: data.per_page
      }
    }
}
