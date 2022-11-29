import http from 'http';
import url from 'url';

const server = http.createServer((req, res) => {
  console.log(req);
});

server.listen(8080, () => {
  console.log('opened server on', server.address());
})