export = Characters;
declare class Characters {
    static getCharacters(characterArray: any): any[];
    /**
     * @type {Characters[]}
     */
    constructor(characterObject: any);
    /**
     * nhentai character id of this character.
     * @type {Number}
     */
    id: number;
    /**
     * Name of this character.
     * @type {String}
     */
    name: string;
    /**
     * Site URL of this character.
     * @type {String}
     */
    url: string;
    /**
     * Count of this character.
     * @type {Number}
     */
    count: number;
}
