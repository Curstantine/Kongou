# Error Codes

Generic error codes mentioned in errors.  
Any error codes that starts with letters are generic errors produced by the wrapper itself, these errors are either related to the input or errors typed into the wrapper.

1. [`K`](##K) for errors reported where data given to the wrapper is wrong.
2. [`KA`](##KA) for errors that's reported in the util file, most likely to be something wrong with the request.
3. [`KC`](##K) for errors that appeared while processing data returned from the API.

## Expected Regular HTTP Error Codes

`404` = Not Found.
`429` = Rate Limit Capped. \*Not sure if this is a thing.

`500` Internal Server Error.
`502` = Bad Gateway.
`503` = Service Not Available.
`504` = Gateway Timeout.

For more information regarding possible error codes, check this [MDN Web Documentation!](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## K

### K001

Retuned when no results were found for the given keyword/s.

`KongouClientError: No Results Found for the Given Keywords. [K001]`

### K002

Retuned when no search parameters are given

`KongouClientError: No Search Parameters Given. [K002]`

## KA

### KAOO1

Returned upon empty `endpoint` param.
This is handled by the wrapper.

`KongouError: No Endpoint Given. [KA001]`

### KA002

Returned a `null` result.

`KongouServerError: Returned response is null. [KA002]`

## KC

### KC001

Returned while parsing the buffer returned from the endpoint.  
Related to the `Content-Type` header in the request.

`KongouServerError: Ran into an error while parsing the response [KC001]`

### KC002

Returned after fitering for any statusCode higher than 400 and checking results array.  
Basically an unknown error.

`KongouServerError: Server returned an unknown error [KC002]`
