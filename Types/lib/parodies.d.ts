export = Parodies;
declare class Parodies {
    static getParodies(parodyArray: any): any[];
    /**
     * @type {Parodies[]}
     */
    constructor(parodyObject: any);
    /**
     * nhentai parody id of this parody.
     * @type {Number}
     */
    id: number;
    /**
     * Name of this parody.
     * @type {String}
     */
    name: string;
    /**
     * Site URL of this parody.
     * @type {String}
     */
    url: string;
    /**
     * Count of this parody.
     * @type {Number}
     */
    count: number;
}
