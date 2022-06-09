export const getHeaders = (request) => {
    return new Headers({
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "content-type": "application/json",
        connection: "keep-alive",
        cookie: request.headers.get("cookie")
    });
}