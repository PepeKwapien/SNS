import * as http from 'http';

const hostname = '0.0.0.0';
const port = 3001;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("I'm listening, yo");
});

server.listen(port, hostname, () => {
    console.log(`Listener running at http://${hostname}:${port}`);
});
