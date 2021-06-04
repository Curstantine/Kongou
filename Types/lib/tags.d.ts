export = Tags;
declare class Tags {
    /**
     * @type {Tags[]}
     */
    constructor(tagObject: any);
    /**
     * nhentai tag id of this tag.
     * @type {Number}
     */
    id: number;
    /**
     * Name of this tag.
     * @type {String}
     */
    name: string;
    /**
     * Site URL of this tag.
     * @type {String}
     */
    url: string;
    /**
     * Count of this tag.
     * @type {Number}
     */
    count: number;
    /**
     * Category of this tag.
     * @type {String}
     */
    category: string;
}
