export = Languages;
declare class Languages {
    static getLanguages(languageArray: any): any[];
    /**
     * @type {Languages[]}
     */
    constructor(languageObject: any);
    /**
     * nhentai language id of this language.
     * @type {Number}
     */
    id: number;
    /**
     * Name of this language.
     * @type {String}
     */
    name: string;
    /**
     * Site URL of this language.
     * @type {String}
     */
    url: string;
    /**
     * Count of this language.
     * @type {Number}
     */
    count: number;
}
