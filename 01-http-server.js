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
            else if (req.method === "POST") {
                // Store request body chunks
                const bodyChunks = [];

                // Count data events
                let chunkCount = 0;

                // Receive request body
                req.on("data", (chunk) => {
                    chunkCount++;

                    console.log("Received chunk:", chunk);
                    console.log("Is Buffer:", Buffer.isBuffer(chunk));

                    bodyChunks.push(chunk);
                });

                // Process request body after receiving all data
                req.on("end", () => {
                    console.log("Total data events:", chunkCount);

                    // // Combine all chunks into one Buffer
                    // const bodyBuffer = Buffer.concat(bodyChunks);

                    // // Convert Buffer to String
                    // const bodyText = bodyBuffer.toString();

                    // console.log("Raw request body:", bodyText);
                    const rawBody = Buffer.concat(bodyChunks).toString();
                    console.log("Raw body", rawBody);

                    try {
                        // Parse JSON string into JavaScript object
                        const parsedBody = JSON.parse(rawBody);

                        // Store parsed data in req.body
                        req.body = parsedBody;

                        console.log("Parsed request body:");
                        console.log(req.body);

                        res.writeHead(200, {
                            "Content-Type": "text/plain"
                        });
                        res.end("JSON received\n");
                    }
                    catch (error) {
                        console.log("JSON parsing failed:", error.message);

                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end("Invalid JSON\n");
                    }
                });

            }
            else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Not Found\n");
                // req.on("data", (chunk) => {
                //     bodyChunks.push(chunk);
                // });
                // req.on("end", () => {
                //     // Process the complete request body
                //     const requestBody = Buffer.concat(bodyChunks).toString();
                //     const bodyBuffer = Buffer.concat(bodyChunks);
                //     const bodyText = bodyBuffer.toString();
                //     const parsedBody = JSON.parse(bodyText);
                // });
                // req.body = parsedBody;

                // console.log("Parsed request body:");
                // console.log(req.body);
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