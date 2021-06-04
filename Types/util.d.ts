/**
 * Sends a HTTPS request to a given endpoint
 *
 * ## Example
 *
 * ```js
 * APIrequest('/gallery/231193').then((data) => console.log(data));
 * ```
 * @param {String} endpoint
 * @param {'GET'} [method='GET']
 * @returns {Promise<APIResponse>}
 */
export function APIRequest(endpoint: string, method?: 'GET'): Promise<any>;
/**
 * Sends a HTTPS request to a given endpoint using searchParameters
 *
 * ## Example
 *
 * ```js
 * APIQueryRequest('/gallery/231193').then((data) => console.log(data));
 * ```
 * @param {String} endpoint
 * @param {'GET'} [method='GET']
 * @param {Object} [keyword]
 * @returns {Promise<APIResponse>}
 */
export function APIQueryRequest(endpoint: string, method?: 'GET', searchParameters?: {}): Promise<any>;
