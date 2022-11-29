import http from 'http';

const server = http.createServer((req, res) => {
  const pathname = req.url;

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello world</h1>');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Not Found</h1>');
  }
});

server.listen(8080, () => {
  console.log('opened server on', server.address());
})