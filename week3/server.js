// server.mjs
import { createServer } from 'node:http';

const content = [
    {
        title: "Welcome to the home page...", 
        body: "Welcome..."
}]

const answerReq = (code, message, response) => {
    let template = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/secret">Secret</a></li>
        <li><a href="/catalog">Catalog</a></li>
    </ul>

    <h1>My Website</h1>
    <p${message}</p>
</body>
</html>`

    response.writeHead(code, { 'Content-Type': 'html' });
    response.end(template)
} 

const server = createServer((req, res) => {
    console.log(`Received request for ${req.url}`)

    switch (req.url) {
        case '/':
            answerReq(200, "Welcome", res);
            break;
        case '/about':
            answerReq(200, "Abbbout", res);
            break;
        case '/contact':
            answerReq(200, "Reach out to me at jxc3042@miami.edu", res);
            break;
        case '/secret':
            answerReq(200, "You found the very secret page !!", res);
            break;
        default:
            answerReq(404, "Page not found...", res);
    }

});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`