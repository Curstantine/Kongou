class KongouError extends Error {
  constructor(code, message) {
    super(`${message} [${code}]`);
    this.name = "KongouError";
  }
}

class KongouClientError extends KongouError {
  constructor(code, message) {
    super(code, message);
    this.name = "KongouClientError";
  }
}

class KongouServerError extends KongouError {
  constructor(code, message) {
    super(code, message);
    this.name = "KongouServerError";
  }
}
module.exports = { KongouError, KongouClientError, KongouServerError };
