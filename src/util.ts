import fetch from 'node-fetch'
import { ServerError, InternalError } from './errors'
import { ServerQueryResponse, ServerResponse, FlavorResponse } from './Interfaces/server'
import { queryParam } from './Interfaces/parser'

export default class Fetcher {
  url: string
  method?: string
  constructor (url: string, method?: string) {
    this.url = url
    this.method = method || 'GET'
  }

  async get (id: number): Promise<ServerResponse> {
    const response = await fetch(this.url + `/gallery/${id}`, { method: this.method })
    if (response.status > 400) throw new ServerError(response.statusText, response.status)

    try {
      return JSON.parse(await response.text())
    } catch (error) {
      throw new InternalError('Something unexpected happened while parsing the response.')
    }
  }

  async getParam (params: queryParam): Promise<ServerQueryResponse> {
    const url = this.url + '/galleries' +
    '/search?query=' +
    (params.keywords + '+') +
    (params.lang ? params.lang : '') +
    (params.page ? `&page=${params.page}` : '') +
    (params.sort ? `&sort=${params.sort}` : '')

    const response = await fetch(encodeURI(url), { method: this.method })
    if (response.status > 400) throw new ServerError(response.statusText, response.status)

    try {
      return JSON.parse(await response.text())
    } catch (error) {
      throw new InternalError('Something unexpected happened while parsing the response.')
    }
  }

  async getFlavor (endpoint: string): Promise<FlavorResponse> {
    const response = await fetch(this.url + endpoint, { method: this.method })
    if (response.status > 400) throw new ServerError(response.statusText, response.status)

    return {
      body: await response.text(),
      headers: response.headers,
      redirected: { bool: response.redirected, str: response.url }
    }
  }
}
