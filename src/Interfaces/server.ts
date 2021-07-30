/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import { Headers } from 'node-fetch'

export enum PageExt {
  j = 'jpg',
  p = 'png',
  g = 'gif',
}

export interface ServerResponse {
    id: number | string
    media_id: string
    title: {
        english: string
        japanese: string
        pretty: string
    }
    images: {
        pages: [{
            t: PageExt
            w: number
            h: number
        }]
        cover: {
            t: PageExt
            w: number
            h: number
        }
        thumbnail: {
            t: PageExt
            w: number
            h: number
        }
    }
    scanlator: string | undefined
    upload_date: number
    tags: [{
        id: number
        type:
          | 'artist'
          | 'category'
          | 'character'
          | 'groups'
          | 'language'
          | 'parody'
          | 'tag'
        name: string
        url: string
        count: number
    }]
    num_pages: number
    num_favorites: number
}

export interface ServerQueryResponse {
    result: ServerResponse[]
    num_pages: number
    per_page: number
}

export interface FlavorResponse {
    body: string,
    headers: Headers,
    redirected: { bool: boolean, str: string }
}
