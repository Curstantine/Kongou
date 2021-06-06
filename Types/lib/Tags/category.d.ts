export = Category;
declare class Category {
    static getCategory(categoryArray: any): any[];
    /**
     * @type {Category[]}
     */
    constructor(categoryObject: any);
    /**
     * Category category id of this object.
     * @type {Number}
     */
    id: number;
    /**
     * Name of this category.
     * @type {String}
     */
    name: string;
    /**
     * Site URL of this category.
     * @type {String}
     */
    url: string;
    /**
     * Number of results for this category.
     * @type {Number}
     */
    count: number;
}
