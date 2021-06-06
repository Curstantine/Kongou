export = Tags;
declare class Tags {
    static getTags(tagArray: any): any[];
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
     * Number of results for this tag.
     * @type {Number}
     */
    count: number;
}
