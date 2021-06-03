const https = require("https");
const {
  KongouError,
  KongouClientError,
  KongouServerError,
} = require("./Errors/errClass");
/**
 * Sends a HTTPS request to a given endpoint
 *
 * ## Example
 *
 * ```js
 * request('/gallery/231193').then((data) => console.log(data));
 * ```
 * @param {String} endpoint
 * @param {'GET'} [method='GET']
 * @returns {Promise<APIResponse>}
 */

function request(endpoint, method = "GET") {
  return new Promise(async (resolve, reject) => {
    if (!endpoint || endpoint.length == 0) {
      reject(new KongouError("KA001", "No Endpoint Given."));
    }
    const options = {
      hostname: "nhentai.net",
      path: "/api/" + endpoint,
      method: method,
    };

    const req = https.request(options, (res) => {
      let responseData = "";
      res.on("data", (data) => {
        responseData += data;
      });
      res.on("end", () => {
        if (
          res.headers["content-type"] !== undefined ||
          res.headers["content-type"].includes("json")
        ) {
          try {
            let json = JSON.parse(responseData);
            if (json === null) {
              reject(
                new KongouServerError("KA002", "Returned Response is null.")
              );
            }
            if (res.statusCode !== 404) {
              if (json.num_pages === 0) {
                reject(
                  new KongouClientError(
                    "K001",
                    "No Results Found for the Given Keywords."
                  )
                );
              }
              resolve(json);
            } else if (res.statusCode < 400) {
              reject(
                new KongouServerError(
                  res.statusCode,
                  "Server returned an error."
                )
              );
            } else {
              reject(
                new KongouServerError(
                  "KC002",
                  "Server returned an unknown error"
                )
              );
            }
            reject(new KongouServerError(json));
          } catch (error) {
            reject(
              new KongouClientError(
                "KC001",
                "Ran into an error while parsing the response."
              )
            );
          }
        }
      });
    });

    req.on("error", (e) => {
      console.error(e);
    });
    req.end();
  });
}
module.export = request;
