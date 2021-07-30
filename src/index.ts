import Parser from './parser'
import Fetcher from './util'
import { InternalError } from './errors'
import { Response, QueryResponse, HomePageResponse, queryParam } from './Interfaces/parser'

export default class Kongou {
    /**
     * Allows you to have your own proxy site for the wrapper to use!
     */
    defaultSite: {
      domain: string,
      api: string
    }

    /**
     * CDN site for that certain proxy site
     */
    staticSite: {
        thumbnails: string,
        images: string
    }

    constructor (defaultSite?: { domain: string, api: string }, staticSite?: {thumbnails: string, images: string}) {
      this.defaultSite =
      defaultSite
        ? {
            domain: defaultSite.domain.replace(/(^\/)?(?=.*)(\/$)?/gim, ''),
            api: defaultSite.domain.replace(/(^\/)?(?=.*)(\/$)?/gim, '')
          }
        : {
            domain: 'https://nhentai.net',
            api: 'https://nhentai.net/api'
          }
      this.staticSite =
      staticSite
        ? {
            thumbnails: staticSite.thumbnails.replace(/(^\/)?(?=.*)(\/$)?/gim, ''),
            images: staticSite.images.replace(/(^\/)?(?=.*)(\/$)?/gim, '')
          }
        : {
            thumbnails: 'https://t.nhentai.net/galleries',
            images: 'https://i.nhentai.net/galleries'
          }
    }

    /**
     * Retrieves data from `api/gallery/id` and parses them to an easily useable format.
     * @param id nhentai gallery id.
     */
    async getBook (id: number | string): Promise<Response> {
      id = typeof id !== 'number' ? parseInt(id) : id
      if (isNaN(id)) throw new InternalError('Given ID is not a number!')
      const data = await new Fetcher(this.defaultSite.api).get(id)
      return new Parser(this.defaultSite.domain, this.staticSite).parseResponse(data)
    }

    /**
     * Retrieves data from `api/galleries/search` and parses them to an easily useable format.
     */
    async getByQuery (object: queryParam | string): Promise<QueryResponse> {
      object = typeof object !== 'string'
        ? {
            keywords: Parser.toURLString(object.keywords),
            page: object.page,
            sort: object.sort,
            lang: object.lang
          }
        : { keywords: Parser.toURLString(object) }

      if (object.keywords.length < 1) throw new InternalError('Keywords cannot be empty!')

      const data = await new Fetcher(this.defaultSite.api).getParam(object)
      return new Parser(this.defaultSite.domain, this.staticSite).parseQueryResponse(data)
    }

    /**
     * Emulates titles available in HomePage through the API.
     * @param filters Filters the results by language and such. [Obstructs the orignal results.]
     */
    async getHomePage (filters?: { language: 'english' | 'japanese' | 'chinese' }): Promise<HomePageResponse> {
      const fetcher = new Fetcher(this.defaultSite.api)
      const parser = new Parser(this.defaultSite.domain, this.staticSite)

      const [latestObject, popularObject]: queryParam[] =
      [{
        keywords: '',
        page: 1,
        lang: filters?.language
      },
      {
        keywords: '',
        page: 1,
        lang: filters?.language,
        sort: 'popular-today'
      }]

      const latestData = await fetcher.getParam(latestObject)
      const popularData = await fetcher.getParam(popularObject)

      return {
        latest: parser.parseQueryResponse(latestData),
        popular: parser.parseQueryResponse(popularData)
      }
    }

    /**
     * Uses the `/random` endpoint redirects and sends {@link Response} according to it.
     */
    async getRandomResponse (): Promise<Response> {
      const request = await new Fetcher(this.defaultSite.domain).getFlavor('/random')
      if (!request.redirected.bool) throw new InternalError('Something happened while running the request.')

      const id = request.redirected.str.replace(/[^0-9]/g, '')
      const data = await new Fetcher(this.defaultSite.api).get(parseInt(id))
      return new Parser(this.defaultSite.domain, this.staticSite).parseResponse(data)
    }
}
