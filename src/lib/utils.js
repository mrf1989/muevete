export const getHeaders = (request) => {
    return new Headers({
        "accept": "*/*",
        "host": request.headers.get("host"),
        "content-type": "application/json",
        "connection": "keep-alive",
        "cookie": request.headers.get("cookie")
    });
}