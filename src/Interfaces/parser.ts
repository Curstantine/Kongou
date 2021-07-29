/* eslint-disable camelcase */

export interface queryParam {
    keywords: string
    page?: number,
    sort?: 'popular' | 'popular-today' | 'popular-weekly'
    lang?: 'english' | 'japanese' | 'chinese'
}

interface TitleObject {
    /**
     * English title of this object. \
     * `[Azuma Tesshin] Ichigo Cake to Mont Blanc | Strawberry Cake & Mont Blanc - The cherry boy with Bitch sister. (COMIC Kairakuten 2018-05) [English] [Tamamo | GDS] [Digital]"`
     */
    english: string
    /**
     * Native title of this object. \
     * `[東鉄神] イチゴのケーキとモンブラン (COMIC 快楽天 2018年5月号) [英訳] [DL版]`
     */
    native: string
    /**
     * Pretty title of this object. \
     * `Ichigo Cake to Mont Blanc | Strawberry Cake & Mont Blanc - The cherry boy with Bitch sister.`
     */
    pretty: string
}

export interface ImageObject {
    /**
     * Full size image urls.
     */
    pages: string[]
    /**
     * Cover sized image url.
     */
    cover: string
    /**
     * Thumbnail sized image url.
     */
    thumbnail: string
}

interface TagObject {
    /**
     * nhentai id for this tag.
     */
    id: number
    /**
     * Name of this tag. \
     * `big boobs`
     */
    name: string
    /**
     * Site URL of this tag. \
     * `https://nhentai.net/tag/big-boobs`
     */
    url: string
    /**
     * Amount of titles in this tag.
     */
    count: number
}

export interface TagCategory {
artists: TagObject[]
category: TagObject[]
characters: TagObject[]
groups: TagObject[]
languages: TagObject[]
parodies: TagObject[]
tags: TagObject[]
}

export interface Response {
    /**
     * id of this object. \
     * `eg: 363636`
     */
    id: number
    /**
     * media_id of this object. \
     * `eg: 1940023`
     */
    media_id: number
    /**
     * Site URL of this object. \
     * https://nhentai.net/g/363636
     */
     url: string
    /**
     * Titles of this object.
     */
    title: TitleObject
    /**
     * Images of this object.
     */
    images: ImageObject
    /**
     * Scanlator of this object. \
     * Not available still. :-(
     */
    scanlator: string | undefined
    /**
     * Uploaded date of this object.
     */
    upload_date: Date
    /**
     * Tags of this object.
     */
    tags: TagCategory
    /**
     * Number of pages this object has.
     */
    num_pages: number
    /**
     * Number of favorites of this object in nhentai
     */
    num_favorites: number
}

export interface QueryResponse {
    /**
     * Array of {@link Response} \
     * ``results = per_page * num_pages``
     */
    result: Response[]
    /**
     * Number of pages for this query.
     */
    num_pages: number
    /**
     * Number of {@link Response} per page.
     */
    per_page: number
}

export interface HomePageResponse {
    /**
     * Results identical to "Latest" on the HomePage of the website in {@link QueryResponse} format.
     */
    latest: QueryResponse
    /**
     * Results identical to "Popular" on the HomePage of the website in {@link QueryResponse} format.
     */
    popular: QueryResponse
}
