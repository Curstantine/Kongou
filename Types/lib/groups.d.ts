export = Groups;
declare class Groups {
    static getGroups(groupArray: any): any[];
    /**
     * @type {Groups[]}
     */
    constructor(groupObject: any);
    /**
     * nhentai group id of this group.
     * @type {Number}
     */
    id: number;
    /**
     * Name of this group.
     * @type {String}
     */
    name: string;
    /**
     * Site URL of this group.
     * @type {String}
     */
    url: string;
    /**
     * Count of this group.
     * @type {Number}
     */
    count: number;
}
