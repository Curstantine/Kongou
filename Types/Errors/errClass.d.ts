export class KongouError extends Error {
    constructor(code: any, message: any);
}
export class KongouClientError extends KongouError {
}
export class KongouServerError extends KongouError {
}
