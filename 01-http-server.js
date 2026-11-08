// console.log("OK");

// Import the http module from Node.js
const http = require("node:http");

// Create on Http server
const server = http.createServer((req, res) => {
    // res.writeHead(200, { "Content-Type": "text/plain" });
    // res.end("Hello Node.js\n");

    // console.log(req.method);
    // console.log(req.url);

    // // Same method
    // if (req.method === "GET" && req.url === "/") {
    //     res.writeHead(200, { "Content-Type": "text/plain" });
    //     res.end("Hello Node.js\n");
    // }
    // else if (req.method === "GET" && req.url === "/health") {
    //     res.writeHead(200, { "Content-Type": "text/plain" });
    //     res.end("Server is healthy\n");
    // }
    // else if (req.method === "GET" && req.url === "/users") {
    //     res.writeHead(200, { "Content-Type": "text/plain" });
    //     res.end("User list\n");
    // }
    // else {
    //     res.writeHead(404, { "Content-Type": "text/plain" });
    //     res.end("Not Found\n");
    // }

    // Same url with diff method
    const url = new URL(req.url, `http://${req.headers.host}`);
    switch (url.pathname) {
        //Home endpoint
        case "/":
            if (req.method === "GET") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Hello Node.js\n");
            }
            else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Not Found\n");
            }
            break;
        //Health endpoint
        case "/health":
            if (req.method === "GET") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Server is healthy\n");
            }
            else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Not Found\n");
            }
            break;
        //Users endpoint
        case "/users":
            if (req.method === "GET") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("User list\n");
            }
            else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Not Found\n");
            }
            break;
        // Unknown endpoint
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found\n");
            break;
    }
});


// Listen on port 3000 for requests
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});